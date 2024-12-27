import { useLoaderData } from "react-router-dom";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsById, getUserWalletKeysById } from "../../api/bitcoin";
import WelcomeSection from "./WelcomeSection";
import WalletsSection from "./WalletsSection";

export async function loader() {
  try {
    const userData = await getUserData();
    if (!userData) {
      return { wallets: null, userData: null, keys: null };
    }

    const wallets = await getUserWalletsById(userData.account_id);
    if (!wallets) {
      return { wallets: null, userData, keys: null };
    } else if (wallets.length === 0) {
      return { wallets: [], userData, keys: [] };
    }

    const getKeysForWallets = async (wallets) => {
      try {
        const keysArray = await Promise.all(
          wallets.map((wallet) => getUserWalletKeysById(wallet.wallet_id))
        );
        return keysArray.flat(); 
      } catch (error) {
        console.error("Error fetching keys for wallets:", error);
        return [];
      }
    };

    const keys = await getKeysForWallets(wallets);

    return { wallets, userData, keys };
  } catch (error) {
    return { wallets: null, userData: null, keys: null };
  }
}

export default function HomePage() {
  const { wallets, userData, keys } = useLoaderData();
  
  if (wallets === null) {
    return (
      <div>
        <h1 className="text-2xl font-bold flex justify-center items-center ">
          Er is een fout opgetreden.
        </h1>
        <p className="text-gray-600 text-md font-medium flex justify-center items-center">
          Probeer het later opnieuw.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <WelcomeSection username={userData.username} />
      <WalletsSection wallets={wallets} keys={keys} />
    </div>
  );
}
