export default function WalletItem({ wallet }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-now"
      >
        {wallet.wallet_id}
      </th>
      <td className="px-6 py-4">{wallet.wallet_name}</td>
      <td className="px-6 py-4">{wallet.key_address}</td>
      <td className="px-6 py-4">
        <span className="font-bold text-gray-600">{wallet.key_balance}</span> BTC
      </td>
    </tr>
  );
}
