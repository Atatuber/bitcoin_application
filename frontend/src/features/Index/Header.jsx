import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

export default function Header({ location }) {
  const isActive = (url) => {
    return location.pathname === url
      ? "block py-2 px-3 text-white md:text-indigo-600 hover:text-indigo-800 md:p-1"
      : "block py-2 px-3 text-gray-900 md:hover:text-indigo-800 md:p-1";
  };

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await logout();

    if (response) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="bg-white border-gray-200">
        <div className="flex items-center justify-between mx-auto p-4">
          <div className="flex gap-10">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="../../src/img/blockchain-icon.png"
                className="h-12"
                alt="ChainVault Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                ChainVault
              </span>
            </a>
            <div
              className="flex justify-center items-center"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <a href="#" className={isActive("/")} aria-current="page">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className={isActive("/wallets")}>
                    Wallet toevoegen
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handleLogout}
                className="flex justify-center items-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Uitloggen
              </button>
              <button className="flex justify-center items-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Account
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
