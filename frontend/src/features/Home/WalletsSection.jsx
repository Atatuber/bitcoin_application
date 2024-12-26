import WalletTable from "./WalletTable";

export default function WalletsSection({ wallets }) {
  return (
    <section className="text-gray-600 body-font bg-white rounded-lg shadow-md m-2">
      <div className="container mx-auto my-auto">
        <div className="flex flex-col text-left w-full p-10">
          <h1 className="m:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Aanwezige wallets
          </h1>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <WalletTable wallets={wallets} />
          </div>
        </div>
      </div>
    </section>
  );
}
