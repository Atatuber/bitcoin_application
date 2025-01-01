import axios from "axios";

export async function sendTransaction(
  sender_address,
  recipient_address,
  amount_to_send,
  fee,
  account_id
) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/btc/transaction",
      { sender_address, recipient_address, amount_to_send, fee, account_id },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response?.status || false;
  }
}

export async function getTransactionsConnectedToAccount(account_id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/btc/transaction/${account_id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error;
    return null;
  }
}
