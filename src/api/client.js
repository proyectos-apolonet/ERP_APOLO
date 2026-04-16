import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

// Interceptor - Si el token vence manda al login automaticamente

client.interceptors.response.use(
    response => response,
    error => {
        if(error.response?.status === 401) {
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default client;