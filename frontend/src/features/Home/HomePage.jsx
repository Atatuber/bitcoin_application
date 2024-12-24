import { useLoaderData } from "react-router-dom";

import { getAllWallets } from "../../api/bitcoin";

import WelcomeSection from "./WelcomeSection";
import WalletsSection from "./WalletsSection";

export async function loader() {
  const wallets = await getAllWallets();
  return { wallets };
}

export default function HomePage() {
  const { wallets } = useLoaderData();

  if (wallets === null) {
    return (
      <div>
        <h1 className="text-2xl font-bold flex justify-center items-center ">
          Er is een fout opgetreden.
        </h1>
        <p className="text-gray-600 text-md font-medium flex justify-center items-center">
          Probeer het later opnieuw.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <WelcomeSection username={"Atakan"}/>
      <WalletsSection />
    </div>
  );
}
