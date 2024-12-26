import axios from "axios";

export async function login(formData) {
    try {
        const response = await axios.post("http://127.0.0.1:5000/api/auth/login", formData);
        return response.data;
    } catch (error) {
        return error.response && error.response.status ? error.response.status : 500;
    }
}