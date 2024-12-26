import axios from "axios";

export async function login(formData) {
    try {
        const response = await axios.post("http://127.0.0.1:500/api/auth", formData);
        return response.data;
    } catch (error) {
        console.error(error);
        return "failed";
    }
}