import { useLoaderData } from "react-router-dom";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../../api/bitcoin";
import { getTransactionsConnectedToAccount } from "../../api/transaction";

import WelcomeSection from "./WelcomeSection";
import WalletsSection from "./WalletsSection";
import TransactionsSection from "./TransactionsSection";
import QuickAccessSection from "./QuickAccessSection";

export async function loader() {
  try {
    const userData = await getUserData();
    const [wallets, transactions] = await Promise.all([
      getUserWalletsAndKeysById(userData.account_id),
      getTransactionsConnectedToAccount(userData.account_id),
    ]);

    return { userData, wallets, transactions };
  } catch {
    return { userData, wallets: [], transactions: [] };
  }
}

export default function HomePage() {
  const { userData, wallets, transactions } = useLoaderData();
  console.log(wallets)

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
      <WalletsSection wallets={wallets} headerMsg={"Beschikbare wallets"} />
      <QuickAccessSection />
      <TransactionsSection transactions={transactions} />
    </div>
  );
}
