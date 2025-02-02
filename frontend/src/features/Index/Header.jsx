import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../api/auth";
import { Menu, MenuButton, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Header({ location }) {
  const isActive = (url) => {
    return location.pathname === url
      ? "text-white md:text-indigo-600 hover:text-gray-800"
      : "text-gray-900 md:hover:text-gray-800";
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
        <div className="flex items-center justify-between lg:mx-auto max-w-[1440px] p-4">
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
              <ul className="font-sm flex flex-col p-4 mr-8 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link to="/" className={isActive("/")} aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/wallets/add" className={isActive("/wallets/add")}>
                    Create BTC wallet
                  </Link>
                </li>
              </ul>

              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition ease-in-out duration-200">
                  Transactions
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </MenuButton>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1">
                      <Link
                        to="/transactions/add"
                        className={`block px-4 py-2 text-sm ${isActive(
                          "/transactions/add"
                        )} hover:bg-gray-100`}
                      >
                        Create transaction
                      </Link>
                      <Link
                        to="/transactions"
                        className={`block px-4 py-2 text-sm ${isActive(
                          "/transactions"
                        )} hover:bg-gray-100`}
                      >
                        All transactions
                      </Link>
                    </div>
                  </div>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handleLogout}
                className="flex justify-center items-center text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-sm rounded-lg px-3 py-2 text-center gap-2 transition ease-in-out duration-200"
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
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
