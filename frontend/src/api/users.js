import axios from "axios";

export async function getUserDataByEmailAddress(email) {

  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/api/users/${email}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
