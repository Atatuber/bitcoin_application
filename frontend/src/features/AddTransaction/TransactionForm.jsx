import { useState } from "react";

import { hasErrors } from "../../common/common";
import { calculateFee } from "../../common/common";
import { sendTransaction } from "../../api/transaction";

export default function TransactionForm({ setMessageState, setSummaryData }) {
  const [formData, setFormData] = useState({
    sender_address: "",
    recipient_address: "",
    amount_to_spend: "",
    fee: "",
  });

  const [errors, setErrors] = useState({
    sender_address: "",
    recipient_address: "",
    amount_to_spend: "",
    fee: "",
  });

  const testnet4AddressRegex =
    /^(tb1[qp][02-9ac-hj-np-z]{38,59}|[mn][1-9A-HJ-NP-Za-km-z]{25,34}|2[1-9A-HJ-NP-Za-km-z]{25,34})$/;

  const calculatedFee = calculateFee(formData.amount_to_spend);

  const validateField = (fieldName, value) => {
    if (fieldName === "sender_address" && value === "") {
      return "BTC Adres van de zender is verplicht.";
    } else if (
      fieldName === "sender_address" &&
      !testnet4AddressRegex.test(value)
    ) {
      return "Voer een valide (testnet4) BTC adres.";
    }

    if (fieldName === "recipient_address" && value === "") {
      return "BTC Adres van de ontvanger is verplicht.";
    } else if (
      fieldName === "recipient_address" &&
      !testnet4AddressRegex.test(value)
    ) {
      return "Voer een valide (testnet4) BTC adres.";
    }

    if (fieldName === "amount_to_spend") {
      if (isNaN(value) || value <= 0) {
        return "Bedrag moet een positief getal zijn.";
      }
    }

    if (fieldName === "fee") {
      if (isNaN(value) || value <= 0) {
        return "Transactiekosten moet een positieve getal zijn.";
      }
    }

    if (fieldName === "fee" && value < calculatedFee) {
      return `De ingevulde transactiekosten zijn te laag. De transactiekosten moeten minimaal ${
        calculatedFee - value
      } zijn.`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors(formData, setErrors, validateField)) return;

    const satoshisPerBTC = 100000000;

    const sendingData = {
      sender_address: formData.sender_address,
      recipient_address: formData.recipient_address,
      amount_to_send: Math.round(formData.amount_to_spend * satoshisPerBTC),
      fee: Math.round(formData.fee * satoshisPerBTC),
    };

    try {
      const isTransactionSend = await sendTransaction(
        sendingData.sender_address,
        sendingData.recipient_address,
        sendingData.amount_to_send,
        sendingData.fee
      );

      if (isTransactionSend !== 422 && isTransactionSend !== 500) {
        const linkToTransaction = `https://mempool.space/testnet4/tx/${isTransactionSend}`;
        setMessageState({
          message: (
            <>
              Uw transactie is succesvol aangemaakt. Volg deze via:{" "}
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

        setFormData({
          sender_address: "",
          recipient_address: "",
          amount_to_spend: "",
          fee: "",
        });
        setSummaryData({});
      } else {
        setMessageState({
          message: `Invalide gegevens ingevoerd. Probeer het opnieuw.`,
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
        message: `Er is een fout opgetreden. Probeer het later opnieuw.`,
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
          Verzender adres
        </label>
        <input
          type="text"
          name="sender_address"
          id="sender_address"
          value={formData.sender_address}
          onChange={handleChange}
          placeholder="BTC Adres van de verzender"
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
          Ontvanger adres
        </label>
        <input
          type="text"
          name="recipient_address"
          id="recipient_address"
          value={formData.recipient_address}
          onChange={handleChange}
          placeholder="BTC Adres van de ontvanger"
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
          Te verzenden bedrag (BTC)
        </label>
        <input
          type="text"
          name="amount_to_spend"
          id="amount_to_spend"
          value={formData.amount_to_spend}
          onChange={handleChange}
          placeholder="Bijv. 0.001"
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
        <label
          htmlFor="fee"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Transactiekosten (BTC)
        </label>
        <input
          type="text"
          name="fee"
          id="fee"
          value={formData.fee}
          onChange={handleChange}
          placeholder="Bijv. 0.0001"
          className={`bg-gray-50 border focus:outline text-gray-900 rounded-lg block w-full p-2.5 ${
            errors.fee
              ? "focus:outline-red-200 border-red-600"
              : formData.fee !== ""
              ? "focus:outline-green-200 border-green-600"
              : "focus:outline-indigo-200 border-gray-300"
          }`}
        />
        {errors.fee && (
          <p className="text-red-600 text-sm mt-1">{errors.fee}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300"
      >
        Verstuur transactie
      </button>
    </form>
  );
}