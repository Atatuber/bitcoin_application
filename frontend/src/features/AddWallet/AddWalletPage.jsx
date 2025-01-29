import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getUserData } from "../../common/retrieveuserdata";
import AddWalletForm from "./AddWalletForm";
import ErrorAlert from "../Common/ErrorAlert";

export async function loader() {
  const userData = await getUserData();

  if (userData === null) {
    return;
  }
  
  return { userData };
}

export default function AddWalletPage() {
  const { userData } = useLoaderData();

  const [messageState, setMessageState] = useState({ message: "", closed: "" });

  return (
    <section className="flex flex-col items-center justify-center bg-gray-50">
      {messageState.message && !messageState.closed && (
        <ErrorAlert
          message={messageState.message}
          setMessageState={setMessageState}
        />
      )}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-4 sm:p-6">
          <div>
            <h1 className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create BTC Wallet
            </h1>
            <p className="text-sm text-gray-600 text-left">
              Add a new BTC wallet to your account
            </p>
          </div>
          <AddWalletForm
            accountId={userData.account_id}
            setMessageState={setMessageState}
          />
        </div>
      </div>
    </section>
  );
}
