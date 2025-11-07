import { API_URL } from "./api-url";
import axios from "axios";

// دریافت لیست کاربرها - Get users list
export const getList = async (limit?: number) => {
    try {
        // اگر limit مشخص نشده، همه کاربرها رو بگیر - If limit not specified, get all users
        const url = limit ? `${API_URL}users?limit=${limit}` : `${API_URL}users?limit=0`;
        const response = await axios.get(url);
        return response.data.users;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};