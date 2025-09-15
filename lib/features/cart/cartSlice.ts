import { createAppSlice } from "@/lib/createAppSlice";
import { addToCart, createCart, getCart, updateCart } from "./cartAPI";
import { CartData } from "../types";

interface CartSliceState {
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	cart: CartData | null;
	cartId: string | null;
}

const initialState: CartSliceState = {
	status: "idle",
	message: "",
	success: false,
	cart: null,
	cartId: null,
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
			async (cart_id: string) => {
				const response = await getCart(cart_id);
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
			async ({ product_id, quantity, refetchCart }: { product_id: string, quantity: number, refetchCart: (cart_id: string) => void }) => {
				const response = await updateCart({ product_id, quantity });
				console.log(response, 'ressssss')

				if (response.data?.cart_id) {
					refetchCart(response.data?.cart_id)
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


	}),
	selectors: {
		selectStatus: (state: CartSliceState) => state.status,
		selectCart: (state: CartSliceState) => state.cart,
		selectCartId: (state: CartSliceState) => state.cartId,
		selectSuccess: (state: CartSliceState) => state.success,
		selectMessage: (state: CartSliceState) => state.message,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getCartAsync, addToCartAsync, createCartAsync, updateCartAsync } = cartSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectCart, selectCartId } = cartSlice.selectors;
export const cartReducer = cartSlice.reducer;