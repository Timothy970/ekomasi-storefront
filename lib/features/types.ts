export interface User {
    phone_number?: string
    email?: string
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

export interface verfiyOtp {
    expires_in: number
    token: string
}

export interface VerifyOtpResponse {
    data: verfiyOtp
    status_code: number
    message: string
    token?: string
}

export interface Product {
    id: string
    name: string
    price: number
    url?: string
}

export interface SubCategory {
    id: string
    name: string
    parent_category_id: string | null
    description: string
    products: Product[]
}

export interface Category {
    id: string
    name: string
    parent_category_id: string | null
    description: string
    subcategories: SubCategory[]
}

export interface CategoryResponse {
    data: Category[]
    message: string
    status_code: number
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

export interface Meta {
    api_version: string;
    version: string;
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

export interface MallVariant {
    variant_id: string;
    variant_type: string;
    name: string;
}

export interface VariantGroup {
    variant_type: string;
    variants: MallVariant[];
}

export interface GetVariantsResponse {
    data: VariantGroup[];
    message: string;
    status_code: number;
}

export interface GetVariantsParams {
    phone_number?: string;
    email?: string;
}
