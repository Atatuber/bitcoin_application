import { useLoaderData } from "react-router-dom";

import { getAllWallets } from "../api/test";

export async function loader() {
  const wallets = await getAllWallets();
  return { wallets };
}

export default function HomePage() {
  const { wallets } = useLoaderData();

  console.log(wallets);
  return (
    <h1 className="text-3xl font-bold underline bg-blue-500">Hello world!</h1>
  );
}
