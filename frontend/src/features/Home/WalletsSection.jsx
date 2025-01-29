import WalletTable from "../Common/WalletTable";

export default function WalletsSection({ wallets }) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 m-2">
      <div className="container mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-900">
            Available wallets
          </h1>
          <p className="text-gray-600 text-base mb-2">
            See your available wallets
          </p>
          {wallets.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <WalletTable wallets={wallets} />
            </div>
          ) : (
            <p className="text-gray-600 text-md font-medium">
              No wallets found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
