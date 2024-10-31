import axios from "axios";
import { refreshToken } from "./UserRequests";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:4000", // Your API base URL
});

// Set up an Axios interceptor to automatically refresh the token
api.interceptors.response.use(
    response => response, // On success, return the response
    async error => {
        const originalRequest = error.config;

        // If the error response is 401 (Unauthorized) and it hasn't been retried yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try refreshing the access token using the refresh token
                const refreshResponse = await refreshToken();

                // Update the Authorization header with the new access token
                axios.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.accessToken}`;

                // Retry the original request with the new token
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Handle token refresh failure, e.g., redirect to login
                window.location.href = '/login'; // Or whatever your login route is
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;