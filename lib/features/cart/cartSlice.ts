import { createAppSlice } from "@/lib/createAppSlice";
import { addToCart, createCart, createGuestOrder, createMemberOrder, deleteProductFromCart, getCart, getUserOrder, getUserOrders, makePayment, updateCart } from "./cartAPI";
import type { CartData, GuestOrderPayload, MemberOrderPayload, Order, Pagination } from "../types";

interface CartSliceState {
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	cart: CartData | null;
	cartId: string | null;
	orders: Order[] | [],
	order: Order | null,
	pagination: Pagination | null;
}

const initialState: CartSliceState = {
	status: "idle",
	message: "",
	success: false,
	cart: null,
	cartId: null,
	orders: [],
	order: null,
	pagination: null,
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
		getCartAsync: create.asyncThunk(
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
		addToCartAsync: create.asyncThunk(
			async ({ product_id, quantity, cart_id }: { product_id: string, quantity: number, cart_id: string }) => {
				const response = await addToCart({ product_id, quantity, cart_id });
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
		createCartAsync: create.asyncThunk(
			async ({ product_id, quantity, createAndAdd }: { product_id: string, quantity: number, createAndAdd: (cart_id: string) => void }) => {
				const response = await createCart({ product_id, quantity });

				if (response.data?.cart_id) {
					createAndAdd(response.data?.cart_id)
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
						state.message = action.payload?.message || "Failed to fetch variants";
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
		updateCartAsync: create.asyncThunk(
			async ({ product_id, quantity, refetchCart, cart_id }: { product_id: string, quantity: number, refetchCart: (cart_id: string) => void, cart_id: string }) => {
				const response = await updateCart({ product_id, quantity, cart_id });

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
			async ({ data, redirectToOrderDetails, extraPaymentPayload }: { data: MemberOrderPayload, redirectToOrderDetails: (cart_id: string, fail: boolean, message: string) => void, extraPaymentPayload: { phone: string, amount: number, reference: string, description: string } }) => {
				const response = await createMemberOrder(data);

				if (response?.data?.order_id) {
					let paymentData = {
						"phone_number": extraPaymentPayload?.phone,
						"amount": response?.data?.total,
						"reference": extraPaymentPayload?.reference,
						"description": extraPaymentPayload?.description,
						"order_id": response?.data?.order_id,
						"delivery_id": response?.data?.delivery_id,
					}

					const paymentRes = await makePayment(paymentData)

					if (paymentRes?.message && !paymentRes?.data?.errorMessage) {
						redirectToOrderDetails(response?.data?.order_id, false, '')
					} else {
						if (paymentRes?.data?.errorMessage) {
							redirectToOrderDetails(response?.data?.order_id, false, paymentRes?.data?.errorMessage)
						} else {
							redirectToOrderDetails(response?.data?.order_id, true, 'Order succesfully placed!')
						}
					}
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 201 && action.payload.data.order_id) {
						state.success = true;
						state.cart = null
						state.cartId = null
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
		createGuestOrderAsync: create.asyncThunk(
			async ({ data, redirectToOrderDetails }: { data: GuestOrderPayload, redirectToOrderDetails: (cart_id: string) => void }) => {
				const response = await createGuestOrder(data);

				if (response?.data?.order_id) {
					redirectToOrderDetails(response?.data?.order_id)
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 201 && action.payload.data.order_id) {
						state.success = true;
						state.cart = null
						state.cartId = null
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
		deleteProductFromCartAsync: create.asyncThunk(
			async ({ product_id, refetchCart, cart_id }: { product_id: string, refetchCart: (cart_id: string) => void, cart_id: string }) => {
				const response = await deleteProductFromCart({ product_id, cart_id });

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
		getOrdersAsync: create.asyncThunk(
			async () => {
				const response = await getUserOrders();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.orders = action.payload.data?.orders
					} else {
						state.message = action.payload?.message || "Failed to fetch cart";
						state.success = false;
						state.orders = []
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
		getOrderAsync: create.asyncThunk(
			async (order_id: string) => {
				const response = await getUserOrder(order_id);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.order = action.payload.data
					} else {
						state.message = action.payload?.message || "Failed to fetch cart";
						state.success = false;
						state.orders = []
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
	}),
	selectors: {
		selectStatus: (state: CartSliceState) => state.status,
		selectCart: (state: CartSliceState) => state.cart,
		selectUserOrders: (state: CartSliceState) => state.orders,
		selectUserOrder: (state: CartSliceState) => state.order,
		selectCartId: (state: CartSliceState) => state.cartId,
		selectSuccess: (state: CartSliceState) => state.success,
		selectMessage: (state: CartSliceState) => state.message,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getCartAsync, addToCartAsync, createCartAsync, updateCartAsync, deleteProductFromCartAsync, createOrderAsync, getOrdersAsync, getOrderAsync } = cartSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectCart, selectCartId, selectUserOrders, selectUserOrder } = cartSlice.selectors;
export const cartReducer = cartSlice.reducer;