import axios from "axios";

export async function getAllWallets() {
  return await axios
    .get("http://127.0.0.1:5000/api/wallets")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}
