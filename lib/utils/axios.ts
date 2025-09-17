import axios from "axios";
import { getStore } from "@/lib/storeRef";
import { showToast } from "@/lib/features/toast/toastSlice";
import { logout, userSlice } from "../features/user/userSlice";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.headers?.requiresAuth) {
        const state = getStore().getState();
        const token = state.user.token;

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        delete config.headers.requiresAuth;
    }
    return config;
});

// Response interceptor: handle 403 and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry || error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const state = getStore().getState();
                const refreshToken = state.user.refresh_token;

                if (!refreshToken) throw new Error("No refresh token available");

                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh-token`, {
                    refresh_token: refreshToken,
                });

                // Update Redux store with new token info
                getStore().dispatch(
                    userSlice.actions.setToken({ token: data.token, refresh_token: data.refresh_token })
                );

                // Retry original request
                if (originalRequest.headers?.Authorization) {
                    originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);

                // Optionally show toast
                getStore().dispatch(
                    showToast({ message: "Session expired. Please log in again.", type: "error" })
                );

                getStore().dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);

export default api;
