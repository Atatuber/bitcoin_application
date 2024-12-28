import axios from "axios";

export async function getUserWalletsById(accountId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallets/${accountId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUserWalletKeysById(walletId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallets/${walletId}/keys`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUserWalletById(walletId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/wallet/${walletId}`,
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

export async function updateBalance(address) {
  try {
    const response = await axios.put(
      `http://127.0.0.1:5000/api/btc/wallets/${address}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
