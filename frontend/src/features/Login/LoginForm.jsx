import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

export default function LoginForm({ setMessageState }) {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    loadingMessage: "",
  });
  const [dots, setDots] = useState(".");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loadingState.loadingMessage) {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") return ".";
          return prev + ".";
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loadingState.loadingMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState({ isLoading: true, loadingMessage: "" });

    const loggedIn = await login(formData);

    if (loggedIn === 200) {
      setLoadingState({
        isLoading: false,
        loadingMessage: "Logging you in",
      });

      setMessageState({});

      navigate(`/`, { replace: true });
    } else if (loggedIn === 401) {
      setMessageState({
        message: "E-mail or password incorrect",
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } else if (loggedIn === 500) {
      setMessageState({
        message: "Something went wrong, please try again",
      });
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }

    setLoadingState((prev) => ({ ...prev, isLoading: false }));
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
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300 rounded-lg block w-full p-2.5 disabled:bg-gray-200"
          placeholder="chainvault@example.com"
          disabled={loadingState.isLoading || loadingState.loadingMessage}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          id="password"
          value={formData.password}
          placeholder="••••••••"
          className="bg-gray-50 border text-gray-900 focus:outline focus:outline-indigo-300  rounded-lg block w-full p-2.5 disabled:bg-gray-200"
          disabled={loadingState.isLoading || loadingState.loadingMessage}
        />
      </div>
      <a
        href="#"
        className="flex text-sm font-medium text-indigo-600 hover:underline"
      >
        Forgot password?
      </a>
      <button
        type="submit"
        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-indigo-800"
        disabled={loadingState.isLoading || loadingState.loadingMessage}
      >
        {loadingState.isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="mr-3 size-5 animate-spin"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22ZM2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </div>
        ) : loadingState.loadingMessage ? (
          <div className="flex items-center justify-center">
            <svg
              className="mr-3 size-5 text-white animate-scale"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {loadingState.loadingMessage}
            <span className="ml-1">{dots}</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
      <p className="text-sm font-light text-gray-500">
        No account?{" "}
        <a href="#" className="font-medium text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
