import { OtpRequestParams, OtpResponse, SignInParams, SignInResponse, SignUpParams, SignUpResponse, VerifyOtpParams, VerifyOtpResponse, } from "../types";
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

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signup`, payload);

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

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signin`, payload);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<SignInResponse>;
        return err.response?.data as SignInResponse;
    }
}

export async function requestOtp(params: OtpRequestParams): Promise<OtpResponse> {
    try {
        const response = await axios.post<OtpResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/resend-otp`, params)

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
        const response = await axios.post<VerifyOtpResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verify-otp`, data)

        return response.data
    } catch (error: any) {
        return error?.response?.data
    }
}



