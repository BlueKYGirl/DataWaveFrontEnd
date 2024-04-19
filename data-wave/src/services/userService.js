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

const registerUser = async (user) => {
    console.log("user:", JSON.stringify(user));
    try {
        await http.post('/user', user);
    } catch (error) {
        throw new Error("Failed to register user");
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

const authenticateUser = async (email, password) => {
    try {
        const response = await http.post('/user/authenticate', { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Authentication failed");
    }
};

export { getAllUsers, getUserById, registerUser, getUserBill, authenticateUser };