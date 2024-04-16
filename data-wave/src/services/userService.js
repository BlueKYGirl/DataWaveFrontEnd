import axios from "axios";

const http = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Content-type': 'application/json',
    },
});

const getAllUsers = async () => {
    try {
        const response = await http.get('/user');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}

const getUserById = async (id) => {
    try {
        const response = await http.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
};

const createUser = async (user) => {
    try {
        const response = await http.post('/user', user);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create user");
    }
};

const getUserBill = async (userId) => {
    try {
        const response = await http.get(`/user/${userId}/bill`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch bill for user with id ${userId}`);
    }
};

export { getAllUsers, getUserById, createUser, getUserBill };
