import WalletItem from "./WalletItem";

export default function WalletTable({ wallets, keys }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Wallet naam
          </th>
          <th scope="col" className="px-6 py-3">
            Wallet adres
          </th>
          <th scope="col" className="px-6 py-3">
            Saldo
          </th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => {
          const walletKey = keys.find(
            (key) => key.wallet_id === wallet.wallet_id
          );
          return (
            <WalletItem key={index} wallet={wallet} walletKey={walletKey} />
          );
        })}
      </tbody>
    </table>
  );
}
