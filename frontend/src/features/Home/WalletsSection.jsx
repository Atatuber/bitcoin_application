import WalletTable from "../Common/WalletTable";

export default function WalletsSection({ wallets }) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 m-2">
      <div className="container mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beschikbare wallets
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Bekijk hier uw bestaande wallets.
          </p>
          {wallets.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <WalletTable wallets={wallets} />
            </div>
          ) : (
            <p className="text-gray-600 text-md font-medium">
              Er zijn geen wallets gevonden.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
