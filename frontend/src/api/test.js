import axios from "axios";

export async function getAllWallets() {
  return await axios
    .get("http://127.0.0.1:5000/test")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error" + error);
      throw error;
    });
}