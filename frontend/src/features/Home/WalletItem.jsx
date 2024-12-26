export default function WalletItem({ wallet }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-now"
      >
        {wallet.name}
      </th>
      <td className="px-6 py-4">{wallet.info.address}</td>
      <td className="px-6 py-4">{wallet.info.balance} BTC</td>
    </tr>
  );
}
