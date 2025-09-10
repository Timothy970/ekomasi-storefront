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

export interface Image {
  image_id: string;
  url: string;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  parent_category_id: string;
  subcategory_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string; // ISO date string
  last_updated: string; // ISO date string
  images?: Image[];
  urls?: Image[];
}

export interface SubCategory {
  id: string;
  name: string;
  parent_id: string | null;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  image_url: string;
  subcategories: SubCategory[] | null;
  products: Product[] | null;
}

export interface Meta {
  page: number;
  size: number;
  total_items: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface CategoriesResponse {
  data: {
    categories: Category[];
    meta: Meta;
  };
  message: string;
  status_code: number;
}

export interface CategoryResponse {
  data: {
    categories: Category[];
    meta: Meta;
  };
  message: string;
  status_code: number;
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

export interface SubCategoryProduct {
  product_id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  parent_category_id: string;
  subcategory_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;
  last_updated: string;
  urls: Image[];
}

export interface SubcategoryProducts {
  id: string;
  name: string;
  image_url: string;
  parent_id: string;
  parent_category_name: string;
  parent_category_image_url: string;
  products: SubCategoryProduct[];
}

export interface Pagination {
  page: number;
  size: number;
  total_items: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface SubcategoryProductsResponse {
  data: {
    pagination: Pagination;
    products: SubcategoryProducts;
  };
  message: string;
  status_code: number;
}

export interface ProductImage {
  image_id: string;
  url: string;
  is_primary: boolean;
}

export interface FeaturedProduct {
  product_id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;  
  last_updated: string; 
  urls: ProductImage[];
}

export interface FeaturedProductsResponse {
  data: FeaturedProduct[];
  message: string;
  status_code: number;
}
