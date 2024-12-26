import { useState, useEffect } from "react";

import { getHeaderName } from "../../common/headername";
import LoginForm from "./LoginForm";
import ErrorAlert from "./ErrorAlert";

export default function LoginPage() {
  const [messageState, setMessageState] = useState({
    message: "",
    closed: false,
  });

  useEffect(() => {
    const headerName = getHeaderName(location);
    document.title = "ChainVault ∙ " + headerName;
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {messageState.message && !messageState.closed && <ErrorAlert message={messageState.message} setMessageState={setMessageState} />}
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-14 -14 mr-2"
            src="../../src/img/blockchain-icon.png"
            alt="logo"
          />
          ChainVault
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Inloggen
            </h1>
            <LoginForm setMessageState={setMessageState} />
          </div>
        </div>
      </div>
    </section>
  );
}
