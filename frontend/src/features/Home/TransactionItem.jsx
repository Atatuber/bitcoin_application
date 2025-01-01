export default function TransactionItem({ transaction }) {
  const satoshiToBitcoin = (amount) => {
    return amount * 0.0000001;
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

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {transaction.transaction_id}
      </th>
      <td className="px-6 py-4">{transaction.wallet_id}</td>
      <td className="px-6 py-4">{formatDate(transaction.timestamp)}</td>
      <td className="px-6 py-4">
        <span className="font-medium text-green-700 bg-green-200 rounded-lg px-2 py-1">
          {satoshiToBitcoin(transaction.amount)} BTC
        </span>
      </td>
      <td className="px-6 py-4`">
        <a className="text-indigo-600 hover:text-indigo-700" href={`https://mempool.space/testnet4/tx/${transaction.txid}`}>Transactie link</a>
      </td>
    </tr>
  );
}
