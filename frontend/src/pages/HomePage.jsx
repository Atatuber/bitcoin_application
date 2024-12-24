import { useLoaderData } from "react-router-dom";

import { getAllWallets } from "../api/bitcoin";

export async function loader() {
  const wallets = await getAllWallets();
  return { wallets };
}

export default function HomePage() {
  const { wallets } = useLoaderData();

  if (wallets === "Geen wallets gevonden.") {
    return (
      <div>
        <h1 className="text-2xl font-bold flex justify-center items-center ">
          {wallets}
        </h1>
        <p className="text-gray-600 text-md font-medium flex justify-center items-center">
          Probeer het later opnieuw.
        </p>
      </div>
    );
  }

  return (
    <h1 className="text-2xl font-bold flex justify-center items-center ">
      {wallets}
    </h1>
  );
}
