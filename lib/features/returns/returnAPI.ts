import api from "@/lib/utils/axios";
import { AxiosError } from "axios";
import { CreateReturnPayload, ReturnResponse, ReturnsResponse } from "../types";


export async function createReturns(payload : CreateReturnPayload) {
    try {
        const response =  await api.post<ReturnsResponse>('returns', payload, { headers: { requiresAuth: true } });
        return response.data;
    }catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getUserReturns(): Promise<ReturnsResponse> {
    try {
        const response = await api.get<ReturnsResponse>('returns/owner/me', { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}


export async function getUserReturn(id: string): Promise<ReturnResponse> {
    try {
        const response = await api.get<ReturnResponse>(`returns/owner/me/${id}`, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}