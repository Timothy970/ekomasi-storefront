import { createAppSlice } from "@/lib/createAppSlice";
import { addToCart, applyPromoCodeDiscount, createCart, createOrder, deleteProductFromCart, getCart, getGuestOrder, getUserOrder, getUserOrders, makePayment, updateCart } from "./cartAPI";
import type { CartData, GuestOrderParams, MemberOrderPayload, Order, Pagination } from "../types";
import { ToastType } from "../toast/toastSlice";

interface CartSliceState {
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	cart: CartData | null;
	buyNowCart: CartData | null;
	cartId: string | null;
	buyNowcartId: string | null;
	orders: Order[] | [],
	order: Order | null,
	pagination: Pagination | null;
	guestOrder: Order | null;
	promoCode: null | string;
}

const initialState: CartSliceState = {
	status: "idle",
	message: "",
	success: false,
	cart: null,
	buyNowCart: null,
	buyNowcartId: null,
	cartId: null,
	orders: [],
	order: null,
	pagination: null,
	guestOrder: null,
	promoCode: null,
};

export const cartSlice = createAppSlice({
	name: "cart",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		setPromocode: create.reducer<string | null>((state, action) => {
			state.promoCode = action.payload;
		}),
		getCartAsync: create.asyncThunk(
			async ({ cart_id, location_id }: { cart_id: string, location_id?: number, code?: string }) => {
				const response = await getCart({ cart_id, location_id });
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.cart = action.payload.data
					} else {
						state.message = action.payload?.message || "Failed to fetch cart";
						state.success = false;
						state.cart = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		getBuyNowCartAsync: create.asyncThunk(
			async ({ cart_id, location_id }: { cart_id: string, location_id?: number }) => {
				const response = await getCart({ cart_id, location_id });
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.buyNowCart = action.payload.data
					} else {
						state.message = action.payload?.message || "Failed to fetch buy now cart";
						state.success = false;
						state.buyNowCart = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		addToCartAsync: create.asyncThunk(
			async ({ product_id, quantity, cart_id, variation_sku }: { product_id: string, quantity: number, cart_id: string, variation_sku?: string }) => {
				const response = await addToCart({ product_id, quantity, cart_id, variation_sku });
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
					} else {
						state.message = action.payload?.message;
						state.success = false;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		applyPromoCodeDiscountAsync: create.asyncThunk(
			async ({ code, cart_id, location_id, handlePromocodeRes, isBuyNow }: { code: string, cart_id: string, location_id: number | null, handlePromocodeRes: (message: string, errorType: ToastType) => void, isBuyNow: boolean }) => {
				const response = await applyPromoCodeDiscount({ code, cart_id, location_id });
				if (response?.status_code === 200) {
					handlePromocodeRes(response?.message, "success")

				} else {
					handlePromocodeRes(response?.message, "error")
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;

						if (action.meta.arg.isBuyNow) {
							state.buyNowCart = action.payload.data
						} else {
							state.cart = action.payload.data
						}

						state.promoCode = action.meta.arg.code;
					} else {
						state.message = action.payload?.message;
						state.success = false;
						state.promoCode = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
					state.promoCode = null
				},
			}
		),
		addToBuyNowCartAsync: create.asyncThunk(
			async ({ product_id, quantity, cart_id, variation_sku }: { product_id: string, quantity: number, cart_id: string, variation_sku?: string }) => {
				const response = await addToCart({ product_id, quantity, cart_id, variation_sku });
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.buyNowCart = action.payload.data
					} else {
						state.message = action.payload?.message;
						state.success = false;
						state.buyNowCart = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		createCartAsync: create.asyncThunk(
			async ({ product_id, quantity, variation_sku, createAndAdd }: { product_id: string, quantity: number, variation_sku?: string, createAndAdd: (cart_id: string, variation_sku?: string) => void }) => {
				const response = await createCart({ product_id, quantity, variation_sku });

				if (response.data?.cart_id) {
					createAndAdd(response.data?.cart_id, variation_sku)
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data.cart_id) {
						state.success = true;
						state.cartId = action.payload.data.cart_id
					} else {
						state.message = action.payload?.message;
						state.success = false;
						state.cartId = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		createBuyNowCartAsync: create.asyncThunk(
			async ({ product_id, quantity, variation_sku, createAndAddBuyNowCart }: { product_id: string, quantity: number, variation_sku?: string, createAndAddBuyNowCart: (cart_id: string, variation_sku?: string) => void }) => {
				const response = await createCart({ product_id, quantity, variation_sku });

				if (response.data?.cart_id) {
					createAndAddBuyNowCart(response.data?.cart_id, variation_sku)
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data.cart_id) {
						state.success = true;
						state.buyNowcartId = action.payload.data.cart_id
					} else {
						state.message = action.payload?.message;
						state.success = false;
						state.buyNowcartId = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		updateCartAsync: create.asyncThunk(
			async ({ product_id, quantity, variation_sku, refetchCart, cart_id }: { product_id: string, quantity: number, variation_sku?: string, refetchCart: (cart_id: string) => void, cart_id: string }) => {
				const response = await updateCart({ product_id, quantity, variation_sku, cart_id });

				if (cart_id) {
					refetchCart(cart_id)
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data.cart_id) {
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch variants";
						state.success = false;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		createOrderAsync: create.asyncThunk(
			async ({
				data,
				redirectToOrderDetails,
				page,
				extraPaymentPayload,
				triggerToast,
			}: {
				data: MemberOrderPayload,
				page: "member" | "guest",