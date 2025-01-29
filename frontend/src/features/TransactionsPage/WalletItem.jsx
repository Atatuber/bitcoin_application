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
        <span className="font-bold text-gray-600">{wallet.balance}</span>{" "}
        BTC
      </td>
      <td className="px-6 py-4">
        <span className="flex justify-center items-center text-black border rounded-lg p-2 gap-2">
          <input
            onChange={handleChange}
            type="radio"
            id={`filter-${wallet.address}`}
            name="filter"
            value={wallet.address}
            checked={isChecked}
          />
          <label htmlFor={`filter-${wallet.address}`}>
            Filter deze wallet
          </label>
        </span>
      </td>
    </tr>
  );
}
