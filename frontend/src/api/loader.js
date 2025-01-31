import { checkUser } from "./auth";
import { getUserData } from "../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../api/bitcoin";
import { getTransactionsConnectedToAccount } from "../api/transaction";

export async function walletsAndTransactionsLoader() {
  try {
    const userData = await getUserData();

    if (!userData) {
      return { userData: null, wallets: [], transactions: [] };
    }

    const [wallets, transactions] = await Promise.all([
      getUserWalletsAndKeysById(userData.account_id),
      getTransactionsConnectedToAccount(userData.account_id),
    ]);

    return { userData, wallets, transactions };
  } catch {
    return { userData: null, wallets: [], transactions: [] };
  }
}

export async function protectedRouteLoader() {
    try {
      const [user, userData] = await Promise.all([checkUser(), getUserData()]);
  
      if (!user || !userData || !userData.account_id) {
        return { user: null, userData: null };
      }
  
      return {
        user,
        userData,
      };
    } catch (error) {
      console.error("Error in loader:", error);
      return { user: null, userData: null };
    }
}

export async function userDataLoader() {
    const userData = await getUserData();
  
    if (userData === null) {
      return;
    }
  
    return { userData };
}
  
