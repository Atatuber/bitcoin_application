import TransactionTable from "./TransactionTable";

export default function TransactionsSection({ transactions }) {
  const hasTransactions = transactions !== null && transactions.length > 0;


  const latestTransactions = hasTransactions && transactions.slice(0, 3);

  return (
    <section className="text-gray-600 body-font bg-white rounded-lg shadow-md m-2 flex justify-center items-center">
      <div className="container mx-auto my-auto text-left">
        <div className="flex flex-col w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Latest transactions
          </h1>
          <p className="text-gray-600 text-base mb-2">
            See the 3 newest transactions
          </p>
          {hasTransactions ? (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <TransactionTable transactions={latestTransactions} />
            </div>
          ) : (
            <p className="text-gray-600 text-md font-medium">
              No transactions found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
