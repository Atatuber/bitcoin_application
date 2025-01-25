import { useState } from "react";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../../api/bitcoin";
import { getTransactionsConnectedToAccount } from "../../api/transaction";
import { useLoaderData } from "react-router-dom";

import TransactionTable from "./TransactionTable";
import WalletTable from "./WalletTable";

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
  const [filteredAddress, setFilteredAddress] = useState("");

  const filterTransactions = (transactions, filteredAddress) => {
    if (!filteredAddress) return transactions;

    return transactions.filter(
      (transaction) =>
        transaction.address_from === filteredAddress ||
        transaction.address_to === filteredAddress
    );
  };

  return (
    <div className="flex justify-center items-start gap-12">
      <section className="bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Alle transacties</h1>
          <p className="text-gray-600">Bekijk hier al uw transacties</p>
          {transactions !== null ? (
            <div className="overflow-x-auto shadow-md rounded-lg m-3">
              <TransactionTable
                transactions={filterTransactions(transactions, filteredAddress)}
              />
            </div>
          ) : (
            <p className="p-2 text-gray-600 font-medium">
              Geen transacties gevonden
            </p>
          )}
        </div>
      </section>
      <section className="bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Alle wallets</h1>
              <p className="text-gray-600">Bekijk hier al uw wallets</p>
            </div>
            {filteredAddress && (
              <button
                onClick={() => setFilteredAddress("")}
                className="flex justify-center items-center border rounded-lg p-2 gap-2 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                  />
                </svg>
                <p>Verwijder filter</p>
              </button>
            )}
          </div>
          {wallets && wallets.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg m-3">
              <WalletTable
                wallets={wallets}
                filteredAddress={filteredAddress}
                setFilteredAddress={setFilteredAddress}
              />
            </div>
          ) : (
            <p className="p-2 text-gray-600 font-medium">
              Geen wallets gevonden
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
