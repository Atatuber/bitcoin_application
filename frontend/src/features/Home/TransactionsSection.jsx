import TransactionTable from "./TransactionTable";

export default function TransactionsSection({ transactions }) {
  console.log(transactions);
  const latestTransactions = transactions.slice(0, 2)
  console.log(latestTransactions)
  return (
    <section className="text-gray-600 body-font bg-white rounded-lg shadow-md m-2 flex justify-center items-center">
      <div className="container mx-auto my-auto text-left">
        <div className="flex flex-col w-full p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Laatste transacties
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Bekijk hier de meest recente transacties.
          </p>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <TransactionTable transactions={transactions} />
            </div>
          ) : (
            <p className="text-gray-600 text-md font-medium">
              Er zijn geen transacties gevonden.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
