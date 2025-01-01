import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../api/auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
            <Link
              to="/"
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
            </Link>
            <div
              className="flex justify-center items-center"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 mr-8 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link to="/" className={isActive("/")} aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/wallets/add" className={isActive("/wallets/add")}>
                    Wallet toevoegen
                  </Link>
                </li>
              </ul>

              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Transacties
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem className="flex justify-start items-center gap-2 w-full">
                      <Link
                        to="/transaction/add"
                        className={`text-sm hover:bg-gray-100 ${isActive(
                          "/transaction"
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="ml-2 size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                          />
                        </svg>
                        Transactie aanmaken
                      </Link>
                    </MenuItem>
                  </div>
                  <div className="py-1">
                    <MenuItem className="flex justify-start items-start gap-2 w-full">
                      <Link
                        to="/transaction"
                        className={`text-sm hover:bg-gray-100 ${isActive(
                          "/transaction"
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="ml-2 size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                        Mijn transacties
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handleLogout}
                className="flex justify-center items-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-2 text-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
