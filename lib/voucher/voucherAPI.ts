import { AxiosError } from "axios";
import api from "../utils/axios";
import { BuyVoucherPayload, CreateVoucherPayload, SingleVoucherPurchasesResponse, SingleVoucherResponse, VoucherDesignsResponse, VoucherPurchasesResponse, VoucherResponse } from "../features/types";

export async function getVouchers(query: string): Promise<VoucherResponse> {
    try {
        const response = await api.get<VoucherResponse>(`admin/vouchers?${query}`, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getVoucherDesigns(query: string): Promise<VoucherDesignsResponse> {
    try {
        const response = await api.get<VoucherDesignsResponse>(`vouchers/designs?${query}`, { headers: { requiresAuth: false } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function uploadVoucherDesign(formData: FormData): Promise<VoucherDesignsResponse> {
    try {
        const response = await api.post<VoucherDesignsResponse>(`admin/vouchers/designs`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                requiresAuth: true
            }
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function createVoucher(payload: CreateVoucherPayload): Promise<VoucherResponse> {
    try {
        const response = await api.post<VoucherResponse>(`admin/vouchers/create`, payload, {
            headers: { requiresAuth: true }
        });

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
export async function deleteSingleVoucher(id: string): Promise<SingleVoucherResponse> {
    try {
        const response = await api.delete<SingleVoucherResponse>(`admin/vouchers/${id}`, {
            headers: { requiresAuth: true }
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function deleteVoucherDesign(id: string): Promise<VoucherDesignsResponse> {
    try {
        const response = await api.delete<VoucherDesignsResponse>(`admin/vouchers/designs/${id}`, {
            headers: { requiresAuth: true }
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getVoucherPurchases(query: string): Promise<VoucherPurchasesResponse> {
    try {
        const response = await api.get<VoucherPurchasesResponse>(`admin/vouchers/purchases?${query}`, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function updateVoucherDesign(voucherID: string, formData: FormData): Promise<VoucherDesignsResponse> {
    try {
        const response = await api.patch<VoucherDesignsResponse>(`admin/vouchers/designs/${voucherID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                requiresAuth: true
            }
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

export async function getSingleVoucherPurchase(id: string): Promise<SingleVoucherPurchasesResponse> {
    try {
        const response = await api.get<SingleVoucherPurchasesResponse>(`admin/vouchers/purchases/${id}`, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function updateBuyVoucher({ payload, id }: { payload: BuyVoucherPayload, id: string }): Promise<VoucherResponse> {
    try {
        const response = await api.patch<VoucherResponse>(`vouchers/buy-voucher/${id}`, payload, {
            headers: { requiresAuth: true }
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}