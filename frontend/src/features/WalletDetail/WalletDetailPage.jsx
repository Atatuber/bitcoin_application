import { useLoaderData } from "react-router-dom";
import { getUserWalletById, getUserWalletKeysById } from "../../api/bitcoin";

export async function loader({ params }) {
  const { id } = params;
  const [wallet, keys] = await Promise.all([
    getUserWalletById(id),
    getUserWalletKeysById(id),
  ]);
  return { wallet, keys };
}

export default function WalletDetailPage() {
  const { wallet, keys } = useLoaderData();
  
  return <div>WalletDetailPage</div>;
}
