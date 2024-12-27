import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddWalletForm({ accountId }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    account_id: accountId,
    wallet_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4 md:space-y-6">
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
          value={formData.wallet_name}
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300 rounded-lg block w-full p-2.5"
          placeholder="Mijn nieuwe wallet"
        />
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
