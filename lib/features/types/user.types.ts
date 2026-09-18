export interface User {
  phone_number?: string
  email?: string
}

export interface WalletTransaction {
  id: number;
  type: 'CREDIT' | 'DEBIT' | 'TOPUP' | 'REFUND';
  amount: number;
  reference: string;
  description: string;
  created_at: string;
}

export interface WalletData {
  user_phone: string;
  balance: number;
  transactions: WalletTransaction[];
}

export interface WalletResponse {
  status_code: number;
  message: string;
  data: WalletData;
}

export interface TopupWalletPayload {
  phone_number: string;
  amount: number;
}

export interface TopupWalletResponse {
  status_code: number;
  message: string;
  data?: {
    checkout_request_id: string;
    reference: string;
  };
  error?: string;
}

export interface SignUpParams {
  phone_number?: string
  email?: string
}

export interface SignInParams {
  phone_number?: string
  email?: string
}

export interface SignUpResponse {
  data: null;
  message: string;
  status_code: number
}

export interface SignInResponse {
  data: null;
  message: string;
  status_code: number
}

export interface OtpRequestParams {
  phone_number?: string
  email?: string
}

export interface OtpResponse {
  status_code: number
  message: string
}

export interface VerifyOtpParams {
  phone_number?: string
  email?: string
  otp: string
}

export interface VerifyOtpData {
  refresh_token: string
  expires_in: number
  token: string
}

export type verfiyOtp = VerifyOtpData;

export interface VerifyOtpResponse {
  data: VerifyOtpData
  status_code: number
  message: string
  token?: string
  refresh_token?: string
}

export interface SubsribeResponse {
  status_code: number;
  message: string;
  data?: any;
}

export type SubscribeResponse = SubsribeResponse;
