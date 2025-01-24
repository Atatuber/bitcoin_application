export default function TransactionItem({ transaction }) {
  const satoshiToBitcoin = (amount) => {
    return (amount * 0.0000001).toFixed(5);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("nl-NL", options);
  };

  const amountLabel = (amount) => {
    return transaction.sending ? (
      <span className="font-medium text-red-700 bg-red-200 rounded-lg px-2 py-1">
        - {satoshiToBitcoin(amount)} BTC
      </span>
    ) : (
      <span className="font-medium text-green-700 bg-green-200 rounded-lg px-2 py-1">
        {satoshiToBitcoin(amount)} BTC
      </span>
    );
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {transaction.transaction_id}
      </th>
      <td className="px-6 py-4">{transaction.address_from}</td>
      <td className="px-6 py-4">{transaction.address_to}</td>
      <td className="px-6 py-4">{amountLabel(transaction.amount)}</td>
      <td className="px-6 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="size-6 text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </td>
    </tr>
  );
}
