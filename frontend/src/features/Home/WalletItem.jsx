export default function WalletItem({ wallet, index }) {
  return (
    <tr class="bg-white border-b hover:bg-gray-50" key={index}>
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-now"
      >
        {wallet.name}
      </th>
      <td class="px-6 py-4">{wallet.info.address}</td>
      <td class="px-6 py-4">{wallet.info.balance} BTC</td>
    </tr>
  );
}
