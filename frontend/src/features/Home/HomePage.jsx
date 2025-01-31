import { useLoaderData } from "react-router-dom";

import WelcomeSection from "./WelcomeSection";
import WalletsSection from "./WalletsSection";
import TransactionsSection from "./TransactionsSection";
import QuickAccessSection from "./QuickAccessSection";

export default function HomePage() {
  const { userData, wallets, transactions } = useLoaderData();

  const sortedWallets = wallets.length > 0 && [...wallets].sort((a, b) => b.balance - a.balance);

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
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4">
      <WelcomeSection username={userData.username} />
      <WalletsSection
        wallets={sortedWallets}
        headerMsg={"Beschikbare wallets"}
      />
      <QuickAccessSection />
      <TransactionsSection transactions={transactions} />
    </div>
  );
}
