import api from "@/lib/utils/axios";
import { UpdateUserProfilePayload, UserAddressesResponse, UserAddressPayload, UserAddressResponse, UserDetailsResponse } from "../types";
import axios, { AxiosError } from "axios";



export async function getUserAddress(): Promise<UserAddressesResponse | null> {
    try {
        const response = await api.get<UserAddressesResponse>("user/profile/addresses", { headers: { requiresAuth: true } });
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


export async function postUserAddress(data: UserAddressPayload): Promise<UserAddressResponse | null> {
    try {
        const response = await api.post<UserAddressResponse>("user/profile/addresses",
            data,
            { headers: { requiresAuth: true } }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function editUserAddress(data: UserAddressPayload, address_id: string): Promise<UserAddressResponse | null> {
    try {
        const response = await api.patch<UserAddressResponse>(`user/profile/addresses/${address_id}`, data, { headers: { requiresAuth: true } });
        
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function deleteUserAddress(address_id: string): Promise<UserAddressResponse | null> {
    try {
        const response = await api.delete<UserAddressResponse>(
            `user/profile/addresses/${address_id}`,
            { headers: { requiresAuth: true } }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}
