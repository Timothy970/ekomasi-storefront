import { AxiosError } from "axios";
import api from "../utils/axios";
import { BuyVoucherPayload, CreateVoucherPayload, RedeemVoucherPayload, RedeemVoucherResponse, SingleVoucherResponse, VoucherDesignsResponse, VoucherResponse } from "../features/types";

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

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function redeemVoucher(payload: RedeemVoucherPayload): Promise<RedeemVoucherResponse> {
    try {
        const response = await api.post<RedeemVoucherResponse>(`vouchers/redeem`, payload, {
            headers: { requiresAuth: true }
        });
        console.log(response, 'resssssss')

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}
