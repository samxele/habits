import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth/";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

const register = async (name, email, password) => {
    try {
        const response = await axios.post(API_URL + "register", {
            name, 
            email, 
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + "login", {
            email, password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const logout = async () => {
    try {
        await axios.get(API_URL + "logout");
    } catch (error) {
        console.error("Logout failed", error);
    }
};

const isAuthenticated = async () => {
    try {
        await axios.get(API_URL + "verify");
        return true;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href ='/auth';
        }
        return false;
    }
};

const authService = {
    register, 
    login, 
    logout, 
    isAuthenticated,
};

export default authService;