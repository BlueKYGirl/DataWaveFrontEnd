import axios from "axios";

const http = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Content-type': 'application/json',
    },
});

const getAllDevices = async () => {
    try {
        const response = await http.get('/device');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch devices");
    }
}

const getAllDevicesByUserId = async (userId) => {
    try {
        const response = await http.get(`/device/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch devices");
    }
}

const getDeviceById = async (id) => {
    try {
        const response = await http.get(`/device/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch device with id ${id}`);
    }
};

const createDevice = async (userId, device) => {
    try {
        const response = await http.post(`/user/${userId}/device`, device);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create device");
    }
};

const deleteDevice = async (id) => {
    try {
        await http.delete(`/device/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete device with id ${id}`);
    }
};

export { getAllDevices, getDeviceById, createDevice, deleteDevice, getAllDevicesByUserId };
