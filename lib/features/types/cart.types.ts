import { Product, ProductImage } from './product.types';

export interface AddToCartRequest {
  product_id: string;
  cart_id: string;
  quantity: number;
  variation_sku?: string;
}

export interface ApplyPromoCodeDiscountRequest {
  code: string;
  cart_id: string;
  location_id: number | null;
}

export interface CreateCartRequest {
  product_id: string;
  quantity: number;
  cart_id?: string;
  variation_sku?: string;
}

export interface WishList {
  is_public: boolean;
  products: Product[];
  name: string;
  wishlist_id: string;
}

export interface WishListData {
  pagination: {
    page: number;
    size: number;
    total_items: number;
    total_pages: number;
    has_prev: boolean;
    has_next: boolean;
  };
  wishlists: WishList[];
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
    cart_id: string;
  };
  message: string;
  status_code?: number;
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
  discount?: number;
  discount_type?: string;
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
  created_at: string;
  last_updated: string;
  urls: ProductUrl[];
  product_variants: null | Record<string, any>;
  variation_sku?: string | null;
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

export interface ApplyPromoCodeDiscountResponse {
  data?: CartData;
  message: string;
  status_code?: number;
}

export interface DeleteCartRequest {
  product_id: string;
  cart_id: string;
}

export interface OrderItem {
  product_id: string;
  variant_id?: string | null;
  variation_sku?: string | null;
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
  payment_method: string;
  delivery_charge: number;
  user_address: Array<{
    address: string;
    address_id: string;
    appartment: string;
    city: string;
    country: string;
    zip_code: string;
  }>;
  guest_delivery_address: {
    street: string;
    apartment: string;
    city: string;
    postal_code: string;
    country: string;
    state: string;
  };
  promo_code?: string | null;
  estimated_tax: number;
}

export interface MemberOrderPayload {
  is_guest_order: boolean;
  guest_personal_details: {
    email?: string;
    phone?: string;
    last_name?: string;
    first_name?: string;
  };
  guest_delivery_address: Record<string, any>;
  order_items: OrderItem[];
  promo_code?: string | null;
}

export interface CreateOrderData {
  order_id: string;
  delivery_id: string;
  total: number;
}

export interface CreateOrderResponse {
  data: CreateOrderData;
  message: string;
  status_code: number;
}

export interface UserOrdersResponse {
  data: {
    pagination: any;
    orders: Order[];
  };
  message: string;
  status_code: number;
}

export interface UserOrderResponse {
  data: Order;
  message: string;
  status_code: number;
}
