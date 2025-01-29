export default function WalletItem({
  wallet,
  setFilteredAddress,
  filteredAddress,
}) {
  const isChecked = wallet.address === filteredAddress;

  const handleChange = (event) => {
    if (event.target.checked) {
      setFilteredAddress(wallet.address);
    } else {
      setFilteredAddress("");
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">{wallet.address}</td>
      <td className="px-6 py-4">
        <span className="font-bold text-gray-600">{wallet.balance}</span> BTC
      </td>
      <td className="px-6 py-4 flex justify-start">
        <input
          onChange={handleChange}
          type="checkbox"
          id={`filter-${wallet.address}`}
          name="filter"
          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          value={wallet.address}
          checked={isChecked}
        />
      </td>
    </tr>
  );
}
