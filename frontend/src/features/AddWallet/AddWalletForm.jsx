import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { hasErrors } from "../../common/common";
import { addWallet } from "../../api/bitcoin";

export default function AddWalletForm({ accountId, setMessageState }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    account_id: accountId,
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  const validateField = (fieldName, value) => {
    if (fieldName === "name") {
      if (value === "") {
        return "Wallet naam is verplicht.";
      }
      if (value.length < 3 || value.length > 50) {
        return "Wallet naam moet tussen de 3 en 50 karakters zijn.";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors(formData, setErrors, validateField)) {
      return;
    }

    const isWalletAdded = await addWallet(formData);

    if (isWalletAdded) {
      navigate("/", { replace: true });
    } else {
      setMessageState({
        message:
          "Er is iets misgegaan bij het aanmaken van de wallet. Probeer het later opnieuw.",
        closed: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Wallet naam
        </label>
        <input
          type="name"
          name="name"
          onChange={handleChange}
          id="name"
          value={formData.name}
          className={`bg-gray-50 border focus:outline text-gray-900 rounded-lg block w-full p-2.5 ${
            errors.name
              ? "focus:outline-red-200 border-red-600"
              : formData.name !== ""
              ? "focus:outline-green-200 border-green-600"
              : "focus:outline-indigo-200 border-gray-300"
          }`}
          placeholder="Mijn nieuwe wallet"
        />
        {errors.name && (
          <p className="text-red-600 font-medium text-sm">
            {errors.name}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Wallet aanmaken
      </button>
    </form>
  );
}
