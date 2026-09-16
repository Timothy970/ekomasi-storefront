import { Product } from './product.types';
import { Pagination } from './common.types';

export interface Design {
  design_id: string;
  url: string;
  name: string;
  status: string;
  created_at: string;
}

export interface Voucher {
  voucher_id: string;
  from: string;
  to: string;
  amount: number;
  balance: number;
  code: string;
  created_at?: string;
  status: string;
  expiry_date: string;
  is_reedemed: boolean;
}

export interface VoucherUsage {
  history_id: string;
  amount_redeemed: number;
  redeemed_date: string;
  item_logs: Product[];
}

export interface SingleVoucher {
  voucher_id: string;
  from: string;
  to: string;
  amount: number;
  balance: number;
  code: string;
  created_at?: string;
  status: string;
  expiry_date: string;
  is_reedemed: boolean;
  voucher_history: VoucherUsage[];
}

export interface VoucherData {
  vouchers: Voucher[];
  pagination: Pagination;
}

export interface VoucherResponse {
  data: VoucherData;
  message: string;
  status_code: number;
}

export interface VoucherDesignData {
  designs: Design[];
  pagination: Pagination;
}

export interface VoucherDesignsResponse {
  data: VoucherDesignData;
  message: string;
  status_code: number;
}

export interface SingleVoucherDesignsResponse {
  data: Design;
  message: string;
  status_code: number;
}

export interface CreateVoucherPayload {
  design_id: string;
  amount: number;
  to_name: string;
  to_email: string;
  from_name: string;
  delivery_time: string;
  message: string;
  phone_number: string;
  payment_method?: string;
}

export interface SingleVoucherResponse {
  data: SingleVoucher;
  message: string;
  status_code: number;
}

export interface VoucherPurchase {
  voucher_id: string;
  code: string;
  image: string;
  amount: number;
  balance: number;
  from_name: string;
  to_name: string;
  from_email: string;
  to_email: string;
  message: string;
  design_url: string;
  created_at: string;
  delivery_time: string | null;
}

export interface VoucherPurchaseData {
  vouchers: VoucherPurchase[];
  pagination: Pagination;
}

export interface VoucherPurchasesResponse {
  data: VoucherPurchaseData;
  message: string;
  status_code: number;
}

export interface SingleVoucherPurchasesResponse {
  data: VoucherPurchase;
  message: string;
  status_code: number;
}

export interface BuyVoucherPayload {
  design_id: string;
  amount: number;
  from_name: string;
  to_name: string;
  to_email: string;
  message: string;
  delivery_time: string;
  phone_number: string;
  payment_method: string;
}

export interface RedeemVoucherPayload {
  code: string;
}

export interface RedeemVoucherResponse {
  data: VoucherData;
  message: string;
  status_code: number;
}

export interface VouchersData {
  pagination: Pagination;
  vouchers: Voucher[];
}

export interface VouchersResponse {
  data: VouchersData;
  message: string;
  status_code: number;
}
