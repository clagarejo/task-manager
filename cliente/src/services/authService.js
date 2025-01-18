import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = (email, password) => axios.post(`${API_URL}`, { email, password });
export const registerUser = (name, email, password) => axios.post(`${API_URL}/new`, { name, email, password });
export const renewToken = (token) => {
    return axios.get(`${API_URL}/renew`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
