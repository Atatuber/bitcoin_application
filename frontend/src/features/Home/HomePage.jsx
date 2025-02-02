import { useLoaderData } from "react-router-dom";

import WelcomeSection from "./WelcomeSection";
import WalletsSection from "./WalletsSection";
import TransactionsSection from "./TransactionsSection";
import BitcoinBalanceWithGraph from "../BitcoinStatus/BitcoinBalanceWithGraph";

export default function HomePage() {
  const { userData, wallets, transactions } = useLoaderData();

  const sortedWallets =
    wallets.length > 0 && [...wallets].sort((a, b) => b.balance - a.balance);

  if (wallets === null) {
    return (
      <div>
        <h1 className="text-2xl font-bold flex justify-center items-center ">
          Something went wrong.
        </h1>
        <p className="text-gray-600 text-md font-medium flex justify-center items-center">
          Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:mx-auto gap-4 p-4 max-w-[1440px]">
      <div className="flex flex-col lg:flex-row">
        <WelcomeSection username={userData.username} />
        <BitcoinBalanceWithGraph wallets={wallets} />
      </div>
      <WalletsSection
        wallets={sortedWallets}
        headerMsg={"Beschikbare wallets"}
      />
      <TransactionsSection transactions={transactions} />
    </div>
  );
}