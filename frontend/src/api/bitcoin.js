import axios from "axios";

export async function getUserWalletsAndKeysById(account_id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallets/${account_id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return {};
  }
}

export async function getUserWalletById(walletId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallets/${walletId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return {};
  }
}

export async function addWallet(formData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/btc/wallets",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getWalletAndKeysByWalletId(walletId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallets/keys/${walletId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return {};
  }
}
