import TransactionTable from "./TransactionTable";

export default function TransactionsTable({
  transactions,
  filteredAddress,
  filterTransactions,
}) {
  return transactions !== null ? (
    <TransactionTable
      transactions={filterTransactions(transactions, filteredAddress)}
    />
  ) : (
    <p className="p-2 text-gray-600 font-medium">Geen transacties gevonden</p>
  );
}
