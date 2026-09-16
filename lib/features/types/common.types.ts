import { Product } from './product.types';

export interface Pagination {
  page: number;
  size: number;
  total_items: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface Meta {
  page?: number;
  size?: number;
  total_items?: number;
  total_pages?: number;
  has_prev?: boolean;
  has_next?: boolean;
  api_version?: string;
  version?: string;
}

export interface SocialLink {
  icon_class: string;
  platform: string;
  url: string;
}

export interface CompanyData {
  company_address: string;
  contact_email: string;
  copyright_text: string;
  menu_links: string[] | null;
  phone_number: string;
  social_links: SocialLink[];
}

export interface HomeDataWrapper {
  data: CompanyData;
  meta: Meta;
}

export interface HomeDataResponse {
  data: HomeDataWrapper;
  message: string;
  status_code: number;
}

export interface MinMaxData {
  cheapest_product: Product;
  expensive_product: Product;
}

export interface MinMaxRangeResponse {
  data: MinMaxData;
  message: string;
  status_code: number;
}

export interface DeliveryLocation {
  id: number;
  location: string;
  charge: number;
}

export interface LocationData {
  locations: DeliveryLocation[] | null;
  pagination: Pagination;
}

export interface LocationsResponse {
  data: LocationData;
  message: string;
  status_code: number;
}

export interface UserData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  phone: string;
}

export interface UserDetailsResponse {
  data: UserData;
  message: string;
  status_code: number;
}

export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  courier?: string;
  address?: string;
  state?: string;
  apartment?: string;
  city?: string;
  postalCode: string;
  voucher?: string;
  paymentMethod?: "card" | "paypal" | "mpesa";
  deliveryType?: "Ship" | "Pickup";
  promoApplied?: boolean;
  paymentPhone?: string;
  deliveryLocationId?: number | string;
  promo_code?: string;
  warehouse_id?: string;
}

export interface PaymentFormData {
  phone_number: string;
  order_id: string;
}

export interface PaymentRequestPayload {
  phone_number: string;
  order_id: string;
}

export interface PaymentRequestResponse {
  data: {
    CheckoutRequestID: string;
    CustomerMessage: string;
    MerchantRequestID: string;
    ResponseCode: string;
    ResponseDescription: string;
    errorCode?: string;
    errorMessage?: string;
  };
  message: string;
  status_code: number;
}

export interface UserAddress {
  address: string;
  address_id: string;
  appartment: string;
  city: string;
  country: string;
  zip_code: string;
}

export interface GuestOrderParams {
  order_id: string;
  email: string;
  phone: string;
}

export interface GuestOrderResponse {
  data: any;
  message: string;
  status_code: number;
}

export interface UpdateUserProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface Address {
  phone_number?: string;
  email?: string;
}

export interface UserAddressPayload {
  address?: string;
  apartment?: string;
  city?: string;
  country?: string;
  zip_code?: string;
}

export interface MyAddress {
  address: string;
  address_id: string;
  apartment?: string;
  city: string;
  country: string;
  zip_code: string;
}

export interface UserAddressesResponse {
  data: MyAddress[];
  message: string;
  status_code: number;
}

export interface UserAddressResponse {
  data: MyAddress;
  message: string;
  status_code: number;
}

export interface Suggestion {
  id: string;
  type: string;
  display_name: string;
  link: string;
  image_url?: string;
  name: string;
}

export interface SuggestionsResponse {
  data: {
    suggestions: Suggestion[];
  };
  status_code: number;
  message: string;
}

export interface SearchResultsResponse {
  data: {
    filters: Filters;
    pagination: Pagination;
    products: Product[];
  };
  status_code: number;
  message: string;
}

export interface Filters {
  category_name: string;
  product_name: string;
  sort_by: string;
  variant_name: string;
  variant_value: string;
}

export interface SearchParams {
  q?: string;
  product_name?: string;
  category_name?: string;
  size?: number;
  page?: number;
  variant_name?: string;
  variant_value?: string;
  sort_by?: string;
}

export interface Crumb {
  name: string;
  link: string;
}

export interface ShareWishListPayload {
  email: string;
  message: string;
  sender_name: string;
}

export * from './static.types';
