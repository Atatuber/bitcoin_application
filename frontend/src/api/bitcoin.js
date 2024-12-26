import axios from "axios";

export async function getAllWallets() {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/wallets");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getWalletInfo(name) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/wallets/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
