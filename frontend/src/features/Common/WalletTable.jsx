import { useState } from "react";

import PaginationButton from "../Common/PaginationButton";
import Pagination from "../Common/Pagination";
import WalletItem from "./WalletItem";

export default function WalletTable({
  wallets,
  setFilteredAddress = "",
  filteredAddress = "",
  isTransactionPage = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!wallets) return;

  const walletsPerPage = 5;
  const walletsLength = wallets.length;

  const lastPage = Math.ceil(walletsLength / walletsPerPage);

  const indexOfLastPost = currentPage * walletsPerPage;
  const indexOfFirstPost = indexOfLastPost - walletsPerPage;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentWallets = wallets.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {isTransactionPage ? (
            <tr>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Filter
              </th>
            </tr>
          ) : (
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {currentWallets.map((wallet, index) => {
            return (
              <WalletItem
                key={index}
                wallet={wallet}
                isTransactionPage={isTransactionPage}
                setFilteredAddress={setFilteredAddress}
                filteredAddress={filteredAddress}
              />
            );
          })}
        </tbody>
      </table>
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
          txPerPage={walletsPerPage}
          length={walletsLength}
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
                  Math.ceil(walletsLength / walletsPerPage)
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
                  Math.ceil(walletsLength / walletsPerPage)
                )
              )
            }
          />
        )}
      </div>
    </>
  );
}
