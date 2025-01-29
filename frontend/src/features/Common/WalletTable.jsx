import WalletItem from "./WalletItem";

export default function WalletTable({ wallets }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Address
          </th>
          <th scope="col" className="px-6 py-3">
            Balance
          </th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => {
          return <WalletItem key={index} wallet={wallet} />;
        })}
      </tbody>
    </table>
  );
}
