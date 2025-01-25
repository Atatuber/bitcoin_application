import WalletItem from "./WalletItem";

export default function WalletTable({ wallets, filteredAddress, setFilteredAddress }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-auto">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Adres
          </th>
          <th scope="col" className="px-6 py-3">
            Saldo
          </th>
          <th scope="col" className="px-6 py-3">
            Acties
          </th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => {
          return (
            <WalletItem
              key={index}
              wallet={wallet}
              filteredAddress={filteredAddress}
              setFilteredAddress={setFilteredAddress}
            />
          );
        })}
      </tbody>
    </table>
  );
}
