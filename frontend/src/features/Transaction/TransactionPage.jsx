import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsById, getUserWalletKeysById } from "../../api/bitcoin";
import { formatMessage } from "../../common/common";

import TransactionForm from "./TransactionForm";
import WalletTable from "../Common/WalletTable";
import Card from "./Card";
import ErrorAlert from "../Common/ErrorAlert";
import SuccessAlert from "../Common/SuccessAlert";

export async function loader() {
  try {
    const userData = await getUserData();
    const wallets = userData
      ? await getUserWalletsById(userData.account_id)
      : [];
    const keys = wallets
      ? await Promise.all(
          wallets.map((w) => getUserWalletKeysById(w.wallet_id))
        )
      : [];
    return { wallets, keys };
  } catch {
    return { wallets: [], keys: [] };
  }
}

export default function TransactionPage() {
  const { wallets, keys } = useLoaderData();
  const [messageState, setMessageState] = useState({
    message: "",
    type: "",
    closed: false,
  });

  const [summaryData, setSummaryData] = useState({
    sender_address: "",
    recipient_address: "",
    amount_to_spend: "",
    fee: "",
  });

  const senderMessage = formatMessage({
    address: summaryData.sender_address,
    amount: summaryData.amount_to_spend,
    fee: summaryData.fee,
    role: "sender",
  });

  const recipientMessage = formatMessage({
    address: summaryData.recipient_address,
    amount: summaryData.amount_to_spend,
    role: "recipient",
  });

  return (
    <section className="bg-gray-50 py-12 flex flex-col items-center justify-center">
      <div className="container w-full">
        {messageState.message &&
          !messageState.closed &&
          messageState.type === "error" && (
            <ErrorAlert
              message={messageState.message}
              setMessageState={setMessageState}
            />
          )}
        {messageState.message &&
          !messageState.closed &&
          messageState.type === "success" && (
            <SuccessAlert
              message={messageState.message}
              setMessageState={setMessageState}
            />
          )}
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">Transactie maken</h1>
          <p className="text-gray-600 text-sm mb-4">Maak hier uw transactie.</p>
          <TransactionForm
            setMessageState={setMessageState}
            setSummaryData={setSummaryData}
          />
        </div>
        <div className="flex flex-col gap-6 h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-900">
                Beschikbare wallets
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                Bekijk hier uw bestaande wallets.
              </p>
              {wallets.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg">
                  <WalletTable wallets={wallets} keys={keys} />
                </div>
              ) : (
                <p className="text-gray-600 text-md font-medium">
                  Er zijn geen wallets gevonden.
                </p>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <h2 className="text-xl font-bold text-gray-900">
              Transactie details
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              De uitkomst van uw transactie.
            </p>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <Card
                title="Verzender"
                message={
                  <span>
                    <strong>{senderMessage.title}</strong>{" "}
                    {senderMessage.description}
                  </span>
                }
              />
              <Card
                title="Ontvanger"
                message={
                  <span>
                    <strong>{recipientMessage.title}</strong>{" "}
                    {recipientMessage.description}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
