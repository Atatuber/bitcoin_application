import TransactionItem from "./TransactionItem";

export default function TransactionTable({ transactions }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Sender
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
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
