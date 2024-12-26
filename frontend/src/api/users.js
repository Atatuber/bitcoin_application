import axios from "axios";

export async function getAllUsers() {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/users");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
