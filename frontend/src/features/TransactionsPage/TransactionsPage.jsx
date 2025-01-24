import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../../api/bitcoin";
import { getTransactionsConnectedToAccount } from "../../api/transaction";
import { useLoaderData } from "react-router-dom";

import TransactionTable from "./TransactionTable";

export async function loader() {
  try {
    const userData = await getUserData();

    if (userData === null) {
      return;
    }
    const [wallets, transactions] = await Promise.all([
      getUserWalletsAndKeysById(userData.account_id),
      getTransactionsConnectedToAccount(userData.account_id),
    ]);

    return { userData, wallets, transactions };
  } catch {
    return { wallets: [], transactions: [] };
  }
}

export default function TransactionsPage() {
  const { wallets, transactions } = useLoaderData();

  return (
    <>
      <section className="bg-gray-50 py-12 flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center container">
          <h1 className="text-3xl font-bold">Alle transacties</h1>
          <p className="text-gray-600">Bekijk hier al uw transacties</p>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </section>
    </>
  );
}
