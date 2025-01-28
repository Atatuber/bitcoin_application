import TransactionTable from "./TransactionTable";

export default function TransactionsTable({ transactions }) {
  return transactions !== null ? (
    <TransactionTable transactions={transactions} />
  ) : (
    <p className="p-2 text-gray-600 font-medium">Geen transacties gevonden</p>
  );
}
