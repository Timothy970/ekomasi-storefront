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

export interface Warranty {
  warranty_type: string;
  warranty_period: string;
  manufacturing_date: string;
  expiry_date: string;
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
  liked_by_user?: boolean;
  tag: string;
  product_variants?: MallVariant[]
  features: ProductFeature[];
  warranty: Warranty;
  details: string[];
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
    pagination: Pagination;
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

export interface MinMaxData {
  cheapest_product: Product;
  expensive_product: Product;
}

export interface MinMaxRangeResponse {
  data: MinMaxData;
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
  liked_by_user?: boolean;
  tag: string;
  product_variants?: MallVariant[]
  features: ProductFeature[];
  warranty: Warranty;
  details: string[];
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
  category_name: string;
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

export interface ProductFeature {
  feature_id: string;
  description: string;
  id: string
  title: string
  header: string
  image?: File | string;
  image_position: "Left" | "Center" | "Right"
  previewUrl?: string | null
  file?: File | null;
  product_specifications?: string[];
  top_section?: {
    title: string;
    description: string;
  }[];
  images?: string[];
  design_type?: string;
}

export interface ProductFeaturedResponse {
  data: ProductFeature[];
  message: string;
  status_code: number;
};

export interface AddToCartRequest {
  product_id: string;
  cart_id: string;
  quantity: number;
}

export interface ApplyPromoCodeDiscountRequest {
  code: string;
  cart_id: string;
  location_id: number | null;
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

export interface SharedWishListResponse {
  data: WishList;
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

export interface ApplyPromoCodeDiscountResponse {
  data?: CartData;
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
  created_at: string;
  last_updated: string;
  urls: ProductUrl[];
  product_variants: null | Record<string, any>;
  category_name: string;
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
  estimated_tax: number;
  delivery_charge: number;
  sub_total: number;
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
  phone: string
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
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  courier?: string
  address?: string
  state?: string
  apartment?: string
  city?: string
  postalCode: string
  voucher?: string
  paymentMethod?: "card" | "paypal" | "mpesa"
  deliveryType?: "Ship" | "Pickup"
  promoApplied?: boolean
  paymentPhone?: string;
  deliveryLocationId?: number | string;
  promo_code?: string;
  warehouse_id?: string;
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
  promo_code: string | null;
};

export interface MemberOrderPayload {
  is_guest_order: boolean;
  guest_personal_details: {
    email?: string;
    phone?: string;
    last_name?: string
    first_name?: string
  };
  guest_delivery_address: {};
  order_items: OrderItem[];
  promo_code?: string | null;
}

export interface OrderItem {
  product_id: string;
  variant_id?: string | null;
  quantity: number;
  unit_price?: number;
  name?: string;
  description?: string;
  price?: number;
  stock_quantity?: number;
  urls?: ProductImage[];
  is_reviewed?: boolean | null;
  review_id?: string | null;
}

export interface CreateOrderData {
  order_id: string
  delivery_id: string,
  total: number
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
    errorCode?: string,
    errorMessage?: string,
  };
  message: string;
  status_code: number;
}

export interface CreateOrderResponse {
  data: CreateOrderData;
  message: string;
  status_code: number;
}

export interface Order {
  order_id: string;
  delivery_id: string;
  sub_total: number;
  created_at: string;
  order_status: string;
  delivery_status: string;
  payment_status: string;
  total_amount: number;
  total_discount: number;
  items: OrderItem[];
  payment_method: string
  delivery_charge: number
  user_address: UserAddress[];
  guest_delivery_address: {
    street: string;
    apartment: string;
    city: string;
    postal_code: string;
    country: string;
    state: string;
  },
  promo_code?: string | null;
  estimated_tax: number;
}

export interface UserAddress {
  address: string;
  address_id: string
  appartment: string
  city: string
  country: string
  zip_code: string
}

export interface OrderData {
  pagination: Pagination;
  orders: Order[]
}

export interface UserOrdersResponse {
  data: OrderData;
  message: string;
  status_code: number;
}

export interface GuestOrderParams {
  order_id: string;
  email: string;
  phone: string;
}

export interface UserOrderResponse {
  data: Order;
  message: string;
  status_code: number;
}

export interface GuestOrderResponse {
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

export interface Address {
  phone_number?: string
  email?: string
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
  name: string
  link: string
}

export interface ShareWishListPayload {
  email: string;
  message: string;
  sender_name: string;
}

export interface ContentAuthor {
  name?: string;
  avatar?: string;
}

export interface Banner {
  image_url?: string;
  alt?: string;
  caption?: string;
}

export interface Paragraph {
  text?: string;
  title?: string;
}

export interface GetStaticContentsResponse {
  data: StaticContent[];
  message: string;
  status_code: number;
}

export interface StaticContentAppSection {
  position?: number;
  banner?: Banner | null;
  paragraphs?: Paragraph[];
  images?: ContentImage[];
  title?: string;
}

export interface ContentImage {
  image_url?: string;
  alt?: string;
  caption?: string;
}

export interface StaticContent {
  id?: string;
  static_page_id?: string;
  author?: ContentAuthor;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  description?: string;
  sections?: StaticContentAppSection[];
  paths?: {
    edit: string;
    view: string;
    create: string;
  };
  path?: string;
}

export interface ScoreCounts {
  score: number;
  count: number;
}

export interface Review {
  reviews: {
    review_id: string;
    user: string;
    details: string;
    score: number;
    created_at: string;
  }[];
  average_score: number;
  score_counts: ScoreCounts[];
}

export interface ReviewResponse {
  data: Review;
  message: string;
  status_code: number;
}

export interface SingleReview {
  review_id: string;
  user: string;
  score: number;
  details: string;
  created_at: string;
}

export interface ReviewsPayload {
  reviews: SingleReview[];
}

export interface SingleReviewResponse {
  data: ReviewsPayload;
  message: string;
  status_code: number;
}


export interface ReviewsResponse {
  data: {
    pagination: Pagination;
    reviews: Review;
  };
  message: string;
  status_code: number;
};

export interface ContentAppSection {
  position?: number;
  banner?: Banner | null;
  paragraphs?: Paragraph[];
  images?: ContentImage[];
  title?: string;
}

export interface Content {
  banner_image_url?: string;
  blog_id?: string;
  id?: string;
  author?: ContentAuthor;
  created_at?: Date;
  updated_at?: Date;
  read_time_minutes?: number;
  title?: string;
  description?: string;
  sections?: ContentAppSection[];
  tags?: string[];
  status?: string;
  image_url?: string;
  is_published?: boolean;
}

export interface BlogsData {
  blogs: Content[];
  pagination: Pagination;
}

export interface GetBlogsResponse {
  data: BlogsData;
  message: string;
  status_code: number
}

export interface GetBlogResponse {
  data: Content;
  message: string;
  status_code: number
}

export interface CreateReturnPayload {
  reason: string;
  order_id: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
}

export interface ReturnsResponse {
  data: Returns[] | null;
  message: string;
  status_code: number;
}

export interface Returns {
  return_id: string;
  order_id: string;
  products: Product[];
  reason: string;
  status: string;
  total_refund: number;
  created_at: string;
}

export interface ReturnResponse {
  data: Returns | null;
  message: string;
  status_code: number;
}

export interface Bundle {
  bundle_description: string;
  bundle_id: string;
  bundle_name: string;
  bundle_price: number;
  compare_at_price: number;
  keep_selling_when_out_of_stock: boolean;
  products: Product[];
}

export interface ProductBundleData {
  pagination: Pagination;
  bundles: Bundle[];
}

export interface ProductBundlesResponse {
  data: ProductBundleData;
  message: string;
  status_code: number;
};

export interface Deal {
  deal_id: string;
  end_date: string;
  image: string;
  is_active: boolean;
  link: string;
  name: string;
  products: Product[];
  start_date: string;
}

export interface FlashSaleDealsData {
  deals: Deal[];
  pagination: Pagination
}

export interface FlashSalesDealsResponse {
  data: FlashSaleDealsData;
  message: string;
  status_code: number;
}

export interface FlashSaleDealData {
  deals: Deal;
  pagination: Pagination;
}

export interface DealResponse {
  data: FlashSaleDealData;
  message: string;
  status_code: number;
};

export interface VoucherResponse {
  data: VoucherData;
  message: string;
  status_code: number;
}

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


export interface VoucherData {
  vouchers: Voucher[];
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

export interface VoucherDesignData {
  designs: Design[];
  pagination: Pagination;
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

export interface VoucherUsage {
  history_id: string;
  amount_redeemed: number;
  redeemed_date: string;
  // order_id: string;
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

export interface VoucherPurchasesResponse {
  data: VoucherPurchaseData;
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

export interface SingleVoucherPurchasesResponse {
  data: VoucherPurchase;
  message: string;
  status_code: number;
}

export interface VoucherPurchaseData {
  vouchers: VoucherPurchase[];
  pagination: Pagination;
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

export interface Warehouse {
  warehouse_id: string
  name: string
  location: string
  warehouse_details: string
}

export interface WarehousesData {
  data: Warehouse[]
  meta: Pagination
}

export interface WarehousesResponse {
  data: WarehousesData
  message: string
  status_code: number
}