import TransactionItem from "./TransactionItem";

export default function TransactionTable({ transactions }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-auto">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Transactie nummer
          </th>
          <th scope="col" className="px-6 py-3">
            Verstuurder
          </th>
          <th scope="col" className="px-6 py-3">
            Ontvanger
          </th>
          <th scope="col" className="px-6 py-3">
            Bedrag
          </th>
          <th scope="col" className="px-6 py-3">
            Tijdstip
          </th>
          <th scope="col" className="px-6 py-3">
            Acties
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return <TransactionItem key={index} transaction={transaction} />;
        })}
      </tbody>
    </table>
  );
}
