import { AxiosError } from "axios";
import api from "../utils/axios";
import { BuyVoucherPayload, CreateVoucherPayload, SingleVoucherResponse, VoucherDesignsResponse, VoucherResponse } from "../features/types";

export async function getVoucherDesigns(query: string): Promise<VoucherDesignsResponse> {
    try {
        const response = await api.get<VoucherDesignsResponse>(`vouchers/designs?${query}`, { headers: { requiresAuth: false } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function createVoucher(payload: CreateVoucherPayload): Promise<VoucherResponse> {
    try {
        const response = await api.post<VoucherResponse>(`vouchers/buy-voucher`, payload, {
            headers: { requiresAuth: true }
        });
        console.log(response, 'resssss')

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getSingleVoucher(id: string): Promise<SingleVoucherResponse> {
    try {
        const response = await api.get<SingleVoucherResponse>(`admin/vouchers/${id}`, {
            headers: { requiresAuth: true }
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function buyVoucher(payload: BuyVoucherPayload): Promise<VoucherResponse> {
    try {
        const response = await api.post<VoucherResponse>(`vouchers/buy-voucher`, payload, {
            headers: { requiresAuth: true }
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}
