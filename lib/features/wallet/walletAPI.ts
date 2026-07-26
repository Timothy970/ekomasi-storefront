import { AxiosError } from "axios";
import api from "../../utils/axios";
import { TopupWalletPayload, TopupWalletResponse, WalletResponse } from "../types";

export async function getWalletBalance(phone: string): Promise<WalletResponse> {
  try {
    const response = await api.get<WalletResponse>(`v1/wallet/balance?phone=${encodeURIComponent(phone)}`, {
      headers: { requiresAuth: true }
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
}

export async function topupWalletMpesa(payload: TopupWalletPayload): Promise<TopupWalletResponse> {
  try {
    const response = await api.post<TopupWalletResponse>(`v1/wallet/topup`, payload, {
      headers: { requiresAuth: true }
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
}
