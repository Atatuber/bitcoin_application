import axios from "axios";

export async function login(formData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response && error.response.status
      ? error.response.status
      : 500;
  }
}

export async function getCookie() {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/auth/cookie", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function checkUser() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/auth/protected",
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.email; 
    } else {
      console.error("User is not authenticated");
      return null;
    }
  } catch (error) {
    console.error("Error checking user authentication:");
    return null;
  }
}

export async function logout() {
  try {
    await axios.post(
      "http://127.0.0.1:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.error("Error logging out");
    return false;
  }
}
