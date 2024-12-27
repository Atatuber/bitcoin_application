import { useLoaderData } from "react-router-dom";
import { getUserData } from "../../common/retrieveuserdata";
import AddWalletForm from "./AddWalletForm";

export async function loader() {
  const userData = await getUserData();
  return { userData } || {};
}

export default function AddWalletPage() {
  const { userData } = useLoaderData();

  return (
    <section className="flex items-center justify-center bg-gray-50">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
          <div>
            <h1 className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Wallet toevoegen
            </h1>
            <p className="text-sm text-gray-600 text-left">
              Voeg een nieuwe wallet toe aan je account.
            </p>
          </div>
          <AddWalletForm accountId={userData.account_id} />
        </div>
      </div>
    </section>
  );
}
