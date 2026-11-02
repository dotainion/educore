import axios from "axios";
import { token } from "../utils/Token";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}/api`,
    timeout: 10000,
    withCredentials: true, // important: send cookies
});

api.interceptors.request.use((config) => {
    if (token.isset()) {
        config.headers.Authorization = `Bearer ${token.get()}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                token.unset();
                console.error('Unauthorized! Redirecting to login...');
            } else if (status === 403) {
                console.error('Forbidden! Access denied.');
            } else if (status >= 500) {
                console.error('Server error! Please try again later.');
            }
        } else if (error.request) {
            console.error('No response from server. Check your network.');
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);
