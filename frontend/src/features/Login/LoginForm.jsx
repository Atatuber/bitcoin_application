import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth";

export default function LoginForm({ setMessageState }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedIn = await login(formData);

    if (loggedIn === 200) {
      navigate("/");
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (loggedIn === 401) {
      setMessageState({
        message: "E-mail of wachtwoord is onjuist.",
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (loggedIn === 500) {
      setMessageState({
        message: "Er is iets fout gegaan, probeer het later opnieuw.",
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          E-mail
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          id="email"
          value={formData.email}
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300 rounded-lg block w-full p-2.5"
          placeholder="mijnemail@voorbeeld.nl"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Wachtwoord
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          id="password"
          value={formData.password}
          placeholder="••••••••"
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300  rounded-lg block w-full p-2.5"
        />
      </div>
        <a
          href="#"
          className="flex text-sm font-medium text-indigo-600 hover:underline"
        >
          Wachtwoord vergeten?
        </a>
      <button
        type="submit"
        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Inloggen
      </button>
      <p className="text-sm font-light text-gray-500">
        Nog geen account?{" "}
        <a href="#" className="font-medium text-indigo-600 hover:underline">
          Account maken
        </a>
      </p>
    </form>
  );
}
