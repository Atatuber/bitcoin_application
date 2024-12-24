import WalletItem from "./WalletItem";

export default function WalletTable({ wallets }) {
  return (
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            Wallet naam
          </th>
          <th scope="col" class="px-6 py-3">
            Wallet adres
          </th>
          <th scope="col" class="px-6 py-3">
            Saldo
          </th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => {
          return <WalletItem wallet={wallet} index={index} />;
        })}
      </tbody>
    </table>
  );
}
