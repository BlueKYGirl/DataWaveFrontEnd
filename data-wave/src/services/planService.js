import axios from "axios";

const http = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Content-type': 'application/json',
    },
});

const getAllPlans = async () => {
    try {
        const response = await http.get('/plan');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch plans");
    }
}

const getPlanById = async (id) => {
    try {
        const response = await http.get(`/plan/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch plan with id ${id}`);
    }
};

export { getAllPlans, getPlanById };
