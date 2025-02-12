import { useState } from "react";

import { hasErrors } from "../../common/common";
import { getFeeForOption } from "../../common/common";
import { sendTransaction } from "../../api/transaction";
import { getUserData } from "../../common/retrieveuserdata";

export default function TransactionForm({
  setMessageState,
  setSummaryData,
  refreshWallets,
}) {

  const [selectedFeeOption, setSelectedFeeOption] = useState("normal"); 

  const [formData, setFormData] = useState({
    sender_address: "",
    recipient_address: "",
    amount_to_spend: "",
    fee: getFeeForOption(selectedFeeOption),
  });

  const [errors, setErrors] = useState({
    sender_address: "",
    recipient_address: "",
    amount_to_spend: "",
    fee: "",
  });



  const testnet4AddressRegex =
    /^(tb1[qp][02-9ac-hj-np-z]{38,59}|[mn][1-9A-HJ-NP-Za-km-z]{25,34}|2[1-9A-HJ-NP-Za-km-z]{25,34})$/;


  const validateField = (fieldName, value) => {
    if (fieldName === "sender_address" && value === "") {
      return "BTC address from sender is obligatory";
    } else if (
      fieldName === "sender_address" &&
      !testnet4AddressRegex.test(value)
    ) {
      return "Insert valid (testnet4) BTC address.";
    }

    if (fieldName === "recipient_address" && value === "") {
      return "BTC address from receiver is obligatory";
    } else if (
      fieldName === "recipient_address" &&
      !testnet4AddressRegex.test(value)
    ) {
      return "Insert valid (testnet4) BTC address.";
    }

    if (fieldName === "amount_to_spend") {
      if (isNaN(value) || value <= 0) {
        return "Amount must be a positive number";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setSummaryData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleFeeOptionClick = (option) => {
    setSelectedFeeOption(option);
    const fee = getFeeForOption(option);
    setFormData((prev) => ({ ...prev, fee }));
    setSummaryData((prev) => ({ ...prev, fee }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors(formData, setErrors, validateField)) return;

    const satoshisPerBTC = 100000000;

    const userAccount = await getUserData();

    const sendingData = {
      sender_address: formData.sender_address,
      recipient_address: formData.recipient_address,
      amount_to_send: Math.round(formData.amount_to_spend * satoshisPerBTC),
      fee: Math.round(formData.fee * satoshisPerBTC),
      account_id: userAccount.account_id,
    };

    try {
      const isTransactionSend = await sendTransaction(
        sendingData.sender_address,
        sendingData.recipient_address,
        sendingData.amount_to_send,
        sendingData.fee,
        sendingData.account_id
      );

      if (
        isTransactionSend !== 422 &&
        isTransactionSend !== 500 &&
        isTransactionSend !== 403 &&
        isTransactionSend !== 400
      ) {
        const linkToTransaction = `https://mempool.space/testnet4/tx/${isTransactionSend}`;
        setMessageState({
          message: (
            <>
              Transaction created successfully. Follow:{" "}
              <a
                className="font-bold"
                href={linkToTransaction}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkToTransaction}
              </a>
            </>
          ),
          type: "success",
          closed: false,
        });
        refreshWallets();
        setFormData({
          sender_address: "",
          recipient_address: "",
          amount_to_spend: "",
          fee: "",
        });
        setSummaryData({});
      } else if (isTransactionSend === 403) {
        setMessageState({
          message: `Inserted wallet is not found. Try again`,
          type: "error",
          closed: false,
        });
        setFormData({
          sender_address: "",
          recipient_address: "",
          amount_to_spend: "",
          fee: "",
        });
        setSummaryData({});
      } else {
        setMessageState({
          message: `Invalid data inserted. Try again`,
          type: "error",
          closed: false,
        });

        setFormData({
          amount_to_spend: "",
          fee: "",
        });
        setSummaryData({});
      }
    } catch (error) {
      setMessageState({
        message: `An error has occurred. Try again`,
        type: "error",
        closed: false,
      });

      setFormData({
        sender_address: "",
        recipient_address: "",
        amount_to_spend: "",
        fee: "",
      });
      setSummaryData({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="sender_address"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Sender address
        </label>
        <input
          type="text"
          name="sender_address"
          id="sender_address"
          value={formData.sender_address}
          onChange={handleChange}
          placeholder="BTC address from sender"
          className={`bg-gray-50 border focus:outline text-gray-900 rounded-lg block w-full p-2.5 ${
            errors.sender_address
              ? "focus:outline-red-200 border-red-600"
              : formData.sender_address !== ""
              ? "focus:outline-green-200 border-green-600"
              : "focus:outline-indigo-200 border-gray-300"
          }`}
        />
        {errors.sender_address && (
          <p className="text-red-600 text-sm mt-1">{errors.sender_address}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="recipient_address"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Receiver address
        </label>
        <input
          type="text"
          name="recipient_address"
          id="recipient_address"
          value={formData.recipient_address}
          onChange={handleChange}
          placeholder="BTC address from receiver"
          className={`bg-gray-50 border focus:outline text-gray-900 rounded-lg block w-full p-2.5 ${
            errors.recipient_address
              ? "focus:outline-red-200 border-red-600"
              : formData.recipient_address !== ""
              ? "focus:outline-green-200 border-green-600"
              : "focus:outline-indigo-200 border-gray-300"
          }`}
        />
        {errors.recipient_address && (
          <p className="text-red-600 text-sm mt-1">
            {errors.recipient_address}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount_to_spend"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Sending amount (BTC)
        </label>
        <input
          type="text"
          name="amount_to_spend"
          id="amount_to_spend"
          value={formData.amount_to_spend}
          onChange={handleChange}
          placeholder="For example: 0.00125"
          className={`bg-gray-50 border focus:outline text-gray-900 rounded-lg block w-full p-2.5 ${
            errors.amount_to_spend
              ? "focus:outline-red-200 border-red-600"
              : formData.amount_to_spend !== ""
              ? "focus:outline-green-200 border-green-600"
              : "focus:outline-indigo-200 border-gray-300"
          }`}
        />
        {errors.amount_to_spend && (
          <p className="text-red-600 text-sm mt-1">{errors.amount_to_spend}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Transaction Speed
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleFeeOptionClick("slow")}
            className={`flex-1 py-2 px-4 rounded-lg shadow-lg border border-gray-200 hover:bg-indigo-600 transition duration-300 ease-in-out hover:text-white ${
              selectedFeeOption === "slow"
                ? "bg-indigo-600 border border-indigo-70 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Slow Arrival
          </button>
          <button
            type="button"
            onClick={() => handleFeeOptionClick("normal")}
            className={`flex-1 py-2 px-4 rounded-lg shadow-lg border border-gray-200 hover:bg-indigo-600 transition duration-300 ease-in-out hover:text-white ${
              selectedFeeOption === "normal"
                ? "bg-indigo-600 border border-indigo-70 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Normal Arrival
          </button>
          <button
            type="button"
            onClick={() => handleFeeOptionClick("fast")}
            className={`flex-1 py-2 px-4 rounded-lg shadow-lg border border-gray-200 hover:bg-indigo-600 transition duration-300 ease-in-out hover:text-white ${
              selectedFeeOption === "fast"
                ? "bg-indigo-600 border border-indigo-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Fast Arrival
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Selected Fee: <strong>{formData.fee}</strong> BTC
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition duration-300 ease-in-out"
      >
        Send transaction
      </button>
    </form>
  );
}