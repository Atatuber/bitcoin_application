import { useState } from "react";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../../api/bitcoin";
import { getTransactionsConnectedToAccount } from "../../api/transaction";
import { useLoaderData } from "react-router-dom";

import WalletTable from "../Common/WalletTable";
import TransactionTable from "./TransactionTable";
import DeleteFilterButton from "./DeleteFilterButton";
import Pagination from "../Common/Pagination";
import PaginationButton from "../Common/PaginationButton";

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
  const [currentPage, setCurrentPage] = useState(1);

  const sortedWallets = [...wallets].sort((a, b) => b.balance - a.balance);

  const filterTransactions = (transactions, filteredAddress) => {
    if (!transactions) return [];

    if (!filteredAddress) return transactions;

    return transactions.filter(
      (transaction) =>
        transaction.address_from === filteredAddress ||
        transaction.address_to === filteredAddress
    );
  };

  const filteredTransactions = filterTransactions(
    transactions,
    filteredAddress
  );

  const transactionsPerPage = 5;
  const transactionsLength = filteredTransactions.length;

  const lastPage = Math.ceil(transactionsLength / transactionsPerPage);

  const indexOfLastPost = currentPage * transactionsPerPage;
  const indexOfFirstPost = indexOfLastPost - transactionsPerPage;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-6">
      <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center md:col-span-2">
        <h1 className="text-3xl font-semibold">All transactions</h1>
        <p className="text-gray-600">View all your transactions</p>
        {currentTransactions !== null && currentTransactions.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg m-2">
            {currentTransactions !== null ? (
              <TransactionTable transactions={currentTransactions} />
            ) : (
              <p className="p-2 text-gray-600 font-medium">
                Geen transacties gevonden
              </p>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
              {currentPage <= 1 ? (
                <PaginationButton
                  isNext={false}
                  disabled={true}
                  onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
                />
              ) : (
                <PaginationButton
                  isNext={false}
                  disabled={false}
                  onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
                />
              )}

              <Pagination
                txPerPage={transactionsPerPage}
                length={transactionsLength}
                currentPage={currentPage}
                onPageChange={handlePagination}
              />
              {currentPage >= lastPage ? (
                <PaginationButton
                  isNext={true}
                  disabled={true}
                  onClick={() =>
                    handlePagination(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(transactionsLength / transactionsPerPage)
                      )
                    )
                  }
                />
              ) : (
                <PaginationButton
                  isNext={true}
                  disabled={false}
                  onClick={() =>
                    handlePagination(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(transactionsLength / transactionsPerPage)
                      )
                    )
                  }
                />
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 p-2">No transactions found</p>
        )}
      </section>

      <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center md:col-span-1">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">All wallets</h1>
            <p className="text-gray-600">View all your BTC wallets</p>
          </div>
          <DeleteFilterButton
            filteredAddress={filteredAddress}
            setFilteredAddress={setFilteredAddress}
          />
        </div>
        {wallets && wallets.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg m-2">
            <WalletTable
              wallets={sortedWallets}
              filteredAddress={filteredAddress}
              setFilteredAddress={setFilteredAddress}
              isTransactionPage={true}
            />
          </div>
        ) : (
          <p className="p-2 text-gray-600 font-medium">No wallets found</p>
        )}
      </section>
    </div>
  );
}
