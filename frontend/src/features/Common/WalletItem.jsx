export default function WalletItem({ wallet }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-now"
      >
        {wallet.wallet_name}
      </th>
      <td className="px-6 py-4">{wallet.key_address}</td>
      <td className="px-6 py-4">{wallet.key_balance} BTC</td>
    </tr>
  );
}
