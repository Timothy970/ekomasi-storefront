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
  refresh_token: string
  expires_in: number
  token: string
}

export interface VerifyOtpResponse {
  data: verfiyOtp
  status_code: number
  message: string
  token?: string
  refresh_token?: string
}

export interface Image {
  image_id: string;
  url: string;
  is_primary: boolean;
}

export interface Product {
  product_id?: string;
  id?: string;
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
  description: string
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
  description: string
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

export interface ProductResponse {
  data: Product;
  message: string;
  status_code: number;
};

export interface AddToCartRequest {
  product_id: string;
  cart_id: string;
  quantity: number;
}

export interface CreateCartRequest {
  product_id: string;
  quantity: number;
  cart_id?: string
}

export interface WishList {
  is_public: boolean;
  products: Product[];
  name: string;
  wishlist_id: string;
}


export interface WishListData {
  pagination: Pagination;
  wishlists: WishList[]
}

export interface WishlistsResponse {
  data: WishListData;
  message: string;
  status_code: number;
}

export interface CreateCartResponse {
  data: {
    cart_id: string
  };
  message: string;
  status_code?: number;
};

export interface DeliveryLocation {
  id: number
  location: string
  charge: number
}

export interface LocationData {
  locations: DeliveryLocation[]
  pagination: Pagination
}

export interface LocationsResponse {
  data: LocationData
  message: string
  status_code: number
}

export interface ProductUrl {
  image_id: string;
  url: string;
  is_primary: boolean;
}

export interface CartProduct {
  product_id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;     // ISO date string
  last_updated: string;   // ISO date string
  urls: ProductUrl[];
  product_variants: null | Record<string, any>; // adjust if variants have structure
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  product_id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  search_vector: string;
  created_at: string;     // ISO date string
  last_updated: string;   // ISO date string
  urls: ProductUrl[];
  product_variants: null | Record<string, any>; // adjust if variants have structure
}

export interface CartData {
  cart_items: CartItem[];
  total: number;
  discount: number;
  final: number;
}

export interface ViewCartResponse {
  data: CartData;
  message: string;
  status_code: number;
}

export interface UserData {
  user_id: string
  email: string
  first_name: string
  last_name: string
  role: string
  phone_number: string
}

export interface UserDetailsResponse {
  data: UserData
  message: string
  status_code: number
}


export interface DeleteCartRequest {
  product_id: string;
  cart_id: string
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  courier: string
  state: string
  address: string
  apartment: string
  city: string
  postalCode: string
  voucher: string
  paymentMethod: "card" | "paypal" | "mpesa"
  deliveryType: "Ship" | "Pickup"
  promoApplied: boolean
  deliveryCharge: number | string
}

export interface OrderPayload {
  user_id: string | null;
  is_guest_order: boolean;
  guest_personal_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  guest_delivery_address: {
    street: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  courier_details: string;
  order_items: {
    product_id: string;
    variant_id: string | null;
    quantity: number;
    unit_price: number;
  }[];
  delivery_charge: number;
  delivery_address: string;
};

export interface MemberOrderPayload {
  user_id: string | undefined;
  is_guest_order: boolean;
  guest_personal_details: {};
  guest_delivery_address: {};
  courier_details: string;
  order_items: OrderItem[];
  delivery_charge: number | string;
  delivery_address: string;
}

export interface GuestOrderPayload {
  user_id: null;
  is_guest_order: boolean;
  guest_personal_details: {};
  guest_delivery_address: {};
  courier_details: string;
  order_items: OrderItem[];
  delivery_charge: number | string;
  delivery_address: string;
}

export interface OrderItem {
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
}

export interface CreateOrderData {
  order_id: string
}

export interface CreateOrderResponse {
  data: CreateOrderData;
  message: string;
  status_code: number;
}

export interface Order {
  order_id: string;
  delivery_id: string;
  created_at: string;
  status: string;
  total_amount: number;
  total_discount: number;
  items: OrderItem[];
}


export interface UserOrdersResponse {
  data: Order[];
  message: string;
  status_code: number;
}

export interface UserOrderResponse {
  data: Order;
  message: string;
  status_code: number;
}

export interface UpdateUserProfilePayload {
    first_name: string
    last_name: string
    email: string
    phone_number: string
}