import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true,
});

export const getMe = async () => {
    const result = await api.get("/me");
    return result.data;
};

export const loginUser = async ({ email, password }) => {
    const result = await api.post("/login", { email, password });
    return result.data.user;
};

export const logoutUser = async () => {
    const result = await api.post("/logout");
    return result;
};