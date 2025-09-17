import api from "@/lib/utils/axios";
import { OtpRequestParams, OtpResponse, SignInParams, SignInResponse, SignUpParams, SignUpResponse, UpdateUserProfilePayload, UserDetailsResponse, VerifyOtpParams, VerifyOtpResponse, } from "../types";
import axios, { AxiosError } from "axios";

export async function signUpUser({ phone_number, email }: SignUpParams): Promise<SignUpResponse> {
    try {
        const payload: Record<string, string> = {};

        if (phone_number) {
            payload.phone_number = phone_number;
        }

        if (email) {
            payload.email = email;
        }

        const response = await api.post<SignUpResponse>("auth/signup", payload);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<SignUpResponse>;
        return err.response?.data as SignUpResponse;
    }
}

export async function signIn({ phone_number, email }: SignInParams): Promise<SignInResponse> {
    try {
        const payload: Record<string, string> = {};

        if (phone_number) {
            payload.phone_number = phone_number;
        }

        if (email) {
            payload.email = email;
        }

        const response = await api.post<SignInResponse>("auth/signin", payload);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<SignInResponse>;
        return err.response?.data as SignInResponse;
    }
}

export async function requestOtp(params: OtpRequestParams): Promise<OtpResponse> {
    try {
        const response = await api.post<OtpResponse>("auth/resend-otp", params);

        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as OtpResponse
        }
        throw error
    }
}

export async function verifyOtp(data: VerifyOtpParams): Promise<VerifyOtpResponse> {
    try {
        const response = await api.post<VerifyOtpResponse>("auth/verify-otp", data);

        return response.data
    } catch (error: any) {
        return error?.response?.data
    }
}

export async function getUserProfile(): Promise<UserDetailsResponse | null> {
    try {
        const response = await api.get<UserDetailsResponse>("user/me", { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function updateUserProfile({ data }: { data: UpdateUserProfilePayload }): Promise<UserDetailsResponse | null> {
    try {
        const response = await api.patch<UserDetailsResponse>("user/me", data, {
            headers: { requiresAuth: true },
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

