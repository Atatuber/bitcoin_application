import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { getUserData } from "../../common/retrieveuserdata";
import { getUserWalletsAndKeysById } from "../../api/bitcoin";
import { formatMessage } from "../../common/common";

import TransactionForm from "./TransactionForm";
import WalletTable from "../Common/WalletTable";
import Card from "./Card";
import ErrorAlert from "../Common/ErrorAlert";
import SuccessAlert from "../Common/SuccessAlert";

export async function loader() {
  try {
    const userData = await getUserData();
    const wallets = await getUserWalletsAndKeysById(userData.account_id);

    return { wallets };
  } catch {
    return { wallets: [] };
  }
}

export default function AddTransactionPage() {
  const { wallets } = useLoaderData();
  const navigate = useNavigate();

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

  const refreshData = () => {
    navigate(`.`, { replace: true });
  };

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
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900">Create transaction</h1>
          <p className="text-gray-600 text-sm mb-4">Send BTC using your wallets</p>
          <TransactionForm
            setMessageState={setMessageState}
            setSummaryData={setSummaryData}
            refreshData={refreshData}
          />
        </div>
        <div className="flex flex-col gap-6 h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-900">
                Available wallets
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                See your available wallets
              </p>
              {wallets.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg">
                  <WalletTable wallets={wallets} />
                </div>
              ) : (
                <p className="text-gray-600 text-md font-medium">
                  No BTC wallets found
                </p>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <h2 className="text-xl font-bold text-gray-900">
              Transaction details details
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Results from your transaction
            </p>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <Card
                title="Sender"
                message={
                  <span>
                    <strong>{senderMessage.title}</strong>{" "}
                    {senderMessage.description}
                  </span>
                }
              />
              <Card
                title="Receiver"
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
