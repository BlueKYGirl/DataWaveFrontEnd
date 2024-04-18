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

const getAllDevicesByPlanUserId = async (planUserId) => {
    try {
        const allDevices = await getAllDevices();
        const devices = allDevices.filter(device => device.planUserId === planUserId);
        return devices;
    } catch (error) {
        throw new Error(`Failed to fetch devices for plan user with id ${planUserId}`);
    }
};

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

const updateDevice = async (id, device) => {
    try {
        await http.put(`/device/${id}`, device);
    } catch (error) {
        throw new Error(`Failed to update device with id ${id}`);
    }
};

const swapPhoneNumber = async (swapRequest) => {
    try {
        const response = await http.put('/device/swap', swapRequest);
        return response.data;
    } catch (error) {
        throw new Error("Failed to swap phone numbers");
    }
};

const getAllDevicesByPhoneNumber = async (phoneNumber) => {
    try {
        const allDevices = await getAllDevices();
        const devices = allDevices.filter(device => device.phoneNumber === phoneNumber);
        return devices;
    } catch (error) {
        throw new Error(`Failed to fetch devices for phone number ${phoneNumber}`);
    }
};
export { 
    getAllDevices, 
    getDeviceById, 
    getAllDevicesByPlanUserId, 
    getAllDevicesByUserId, 
    createDevice, 
    deleteDevice, 
    updateDevice,
    swapPhoneNumber,
    getAllDevicesByPhoneNumber 
};
