export default function WalletItem({ wallet, walletKey }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-now"
      >
        {wallet.name}
      </th>
      <td className="px-6 py-4">{walletKey.address}</td>
      <td className="px-6 py-4">{walletKey.balance} BTC</td>
    </tr>
  );
}
