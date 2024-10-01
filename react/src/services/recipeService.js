import axios from "axios";
import { User } from "../global/user";

const baseUrl = "http://localhost:3001";

const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/api/login`, { username, password });
    return response.data;
}

const createUser = async (name, username, password) => {
    const response = await axios.post(`${baseUrl}/api/users`, { name, username, password });
    return response.data;
}

const logout = async () => {
    const config = {
        headers: { Authorization: `Bearer ${User.token}` },
    };
    console.log('config', config);
    const response = await axios.post(`${baseUrl}/api/logout`, {}, config);
    return response.data;
}

const getReceipts = async () => {
    const response = await axios.get(`${baseUrl}/api/recipes`);
    return response.data;
}

const getRecipeBySearch = async (query) => {
    const response = await axios.post(`${baseUrl}/api/recipes/getBySearch`, query);
    return response.data;
}

const getReceiptById = async (id) => {
    const response = await axios.get(`${baseUrl}/api/recipes/${id}`);
    return response.data;
}

const getAllReceiptsByUser = async () => {
    const config = {
        headers: { Authorization: `Bearer ${User.token}` },
    };
    const response = await axios.post(`${baseUrl}/api/recipes/getAllRecipesByUser`, {}, config);
    return response.data;
}

const createReceipt = async (newReceipt) => {
    const config = {
        headers: { Authorization: `Bearer ${User.token}` },
    };
    const response = await axios.post(`${baseUrl}/api/recipes`, newReceipt, config);
    return response.data;
}

const updateReceipt = async (id, newReceipt) => {
    const config = {
        headers: { Authorization: `Bearer ${User.token}` },
    };
    const response = await axios.put(`${baseUrl}/api/recipes/${id}`, newReceipt, config);
    return response.data;
}

const deleteReceipt = async (id) => {
    const config = {
        headers: { Authorization: `Bearer ${User.token}` },
    };
    const response = await axios.delete(`${baseUrl}/api/recipes/${id}`, config);
    return response.data;
}

export default {
    login,
    getReceipts,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    logout,
    getAllReceiptsByUser,
    getReceiptById,
    createUser,
    getRecipeBySearch
};