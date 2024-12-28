import {
  getUserWalletsById,
  getUserWalletKeysById,
  updateBalance,
} from "../api/bitcoin";

export const updateWalletBalances = async (accountId) => {
  try {
    const wallets = await getUserWalletsById(accountId);

    if (wallets && wallets.length > 0) {
      for (const wallet of wallets) {
        const keys = await getUserWalletKeysById(wallet.wallet_id);

        if (keys && keys.address) {
          await updateBalance(keys.address);
        }
      }
    }
  } catch (error) {
    return null;
  }
};
