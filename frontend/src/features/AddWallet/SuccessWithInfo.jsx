import { Link } from "react-router-dom";
import walletIcon from "../../img/wallet-icon.png";

export default function SuccessWithInfo(props) {
  return !props.isWalletCreated ? (
    <></>
  ) : (
    <section className="w-full bg-white rounded-lg shadow-lg p-6 sm:max-w-md mx-auto">
      <div className="flex items-center justify-start gap-3">
        <img src={walletIcon} className="size-32" alt="Wallet icon" />
        <h1 className="text-2xl font-semibold">Wallet Created Successfully</h1>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h1 className="mb-2">
            <strong>{props.walletName}</strong> has been created succesfully.
          </h1>

          <h2 className="text-lg font-bold text-gray-800">ATTENTION</h2>
          <p className="text-gray-700">
            You will only get the following information now. Store it securely,
            as it is the only way to access your wallet.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Mnemonic</h2>
          <p className="mt-2 text-gray-700 break-all font-mono bg-gray-100 p-2 rounded">
            {props.mnemonic}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Private Key</h2>
          <p className="mt-2 text-gray-700 break-all font-mono bg-gray-100 p-2 rounded">
            {props.privateKey}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Do not share this information with anyone. Keep it safe!</p>
      </div>

      <div className="flex justify-end">
        <Link
          to="/"
          className="bg-indigo-600 text-white rounded-lg shadow-lg border-indigo-700 hover:bg-indigo-700 transition ease-in-out duration-200 m-2 px-2 py-2"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
}
