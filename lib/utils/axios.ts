import axios from "axios";
import { getStore } from "@/lib/storeRef";
import { showToast } from "@/lib/features/toast/toastSlice";
import { logout, userSlice } from "../features/user/userSlice";
import { HTTP_STATUS } from "../utils";

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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (!status) {
            getStore().dispatch(
                showToast({
                    message: "Network error — please check your connection.",
                    type: "error",
                })
            );
            return Promise.reject(error);
        }

        if (status === HTTP_STATUS.UNAUTHORIZED) {
            getStore().dispatch(
                showToast({
                    message: "Invalid email or phone number.",
                    type: "error",
                })
            );

            setTimeout(() => {
                window.location.href = "/user/signup";
            }, 2000);

            return Promise.reject(error);
        }

        if ((status === HTTP_STATUS.FORBIDDEN) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const state = getStore().getState();
                const refreshToken = state.user.refresh_token;

                if (!refreshToken) throw new Error("No refresh token available");

                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh-token`,
                    { refresh_token: refreshToken }
                );

                getStore().dispatch(
                    userSlice.actions.setToken({
                        token: data.token,
                        refresh_token: data.refresh_token,
                    })
                );

                originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);

                getStore().dispatch(
                    showToast({
                        message: "Session expired. Please log in again.",
                        type: "error",
                    })
                );

                getStore().dispatch(logout());

                setTimeout(() => {
                    window.location.href = "/user/signup";
                }, 2000);
            }
        }

        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                getStore().dispatch(
                    showToast({
                        message:
                            error.response?.data?.message ||
                            "Bad request — please check your input.",
                        type: "error",
                    })
                );
                break;

            case HTTP_STATUS.NOT_FOUND:
                getStore().dispatch(
                    showToast({
                        message: "Resource not found.",
                        type: "error",
                    })
                );
                break;

            case HTTP_STATUS.SERVER_ERROR:
                getStore().dispatch(
                    showToast({
                        message: "Server error — please try again later.",
                        type: "error",
                    })
                );
                break;

            default:
                getStore().dispatch(
                    showToast({
                        message:
                            error.response?.data?.message ||
                            `Unexpected error (${status}). Please try again.`,
                        type: "error",
                    })
                );
        }

        return Promise.reject(error);
    }
);

export default api;
