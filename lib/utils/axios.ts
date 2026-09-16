import axios from "axios";
import { getStore } from "@/lib/storeRef";
import { showToast } from "@/lib/features/toast/toastSlice";
import { logout, userSlice } from "../features/user/userSlice";
import { HTTP_STATUS } from "../utils";

const EN_FALLBACK_MESSAGES: Record<number, string> = {
    400: "Bad request — please check your input.",
    401: "Session expired. Please log in again.",
    403: "Access denied.",
    404: "Resource not found.",
    500: "Server error — please try again later.",
};

function getErrorMessage(error: any, status?: number): string {
    const backend = error?.response?.data;

    if (backend?.message) return backend.message;

    if (status && EN_FALLBACK_MESSAGES[status]) {
        return EN_FALLBACK_MESSAGES[status];
    }

    return "An unexpected error occurred — please try again.";
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

if (typeof window !== "undefined") {
    api.defaults.headers.common["X-Tenant-Domain"] = window.location.host;
    axios.defaults.headers.common["X-Tenant-Domain"] = window.location.host;
}

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
            throw error;
        }

        if (status === HTTP_STATUS.UNAUTHORIZED) {
            getStore().dispatch(
                showToast({
                    message: getErrorMessage(error, status),
                    type: "error",
                })
            );

            setTimeout(() => {
                window.location.href = "/user/login";
            }, 2000);

            throw error;
        }

        if (status === HTTP_STATUS.FORBIDDEN && !originalRequest._retry) {
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
                    window.location.href = "/user/login";
                }, 2000);
            }
        }

        const message = getErrorMessage(error, status);

        getStore().dispatch(
            showToast({
                message,
                type: "error",
            })
        );

        throw error;
    }
);

export default api;
