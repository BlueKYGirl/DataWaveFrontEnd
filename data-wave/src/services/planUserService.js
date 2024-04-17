import axios from "axios";

const http = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Content-type': 'application/json',
    },
});

const getAllPlanUsers = async () => {
    try {
        const response = await http.get('/planuser');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch plan users");
    }
}

const getPlanUserById = async (id) => {
    try {
        const response = await http.get(`/planuser/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch plan user with id ${id}`);
    }
};

const createPlanUser = async (planUser) => {
    try {
        const response = await http.post('/planuser', planUser);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create plan user");
    }
};

const deletePlanUser = async (id) => {
    try {
        await http.delete(`/planuser/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete plan user with id ${id}`);
    }
};

export { getAllPlanUsers, getPlanUserById, createPlanUser, deletePlanUser };
