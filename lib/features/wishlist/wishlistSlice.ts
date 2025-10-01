import { createAppSlice } from "@/lib/createAppSlice";
import { addProductToWishList, deleteProductFromWishList, getWishLists } from "./wishlistAPI";
import { Pagination, WishList } from "../types";
import { ToastType } from "../toast/toastSlice";

interface WishListsSliceState {
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	wishLists: WishList[] | null;
	wishListPagination: Pagination | null,
}

const initialState: WishListsSliceState = {
	status: "idle",
	message: "",
	success: false,
	wishLists: null,
	wishListPagination: null,
};

export const wishListsSlice = createAppSlice({
	name: "wishlists",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		createWishListAsync: create.asyncThunk(
			async ({ token, product_id }: { token: string, product_id: string }) => {
				const response = await addProductToWishList(token, product_id);
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
		getWishListsAsync: create.asyncThunk(
			async (token: string) => {
				const response = await getWishLists(token);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.wishLists = action.payload.data.wishlists
						state.wishListPagination = action.payload.data.pagination
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch variants";
						state.success = false;
						state.wishLists = null;
						state.wishListPagination = null;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
					state.wishLists = null;
					state.wishListPagination = null;
				},
			}
		),
		deleteProductFromWishListAsync: create.asyncThunk(
			async ({ product_id, refetchWishList , triggerToast}: { product_id: string, refetchWishList: () => void, triggerToast: (message: string, type: ToastType) => void }) => {
				const response = await deleteProductFromWishList(product_id);

				refetchWishList()
				triggerToast("Wishlist updated successfully!", "info")
	
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
	}),
	selectors: {
		selectStatus: (state: WishListsSliceState) => state.status,
		selectSuccess: (state: WishListsSliceState) => state.success,
		selectMessage: (state: WishListsSliceState) => state.message,
		selectWishLists: (state: WishListsSliceState) => state.wishLists,
		selectWishListPagination: (state: WishListsSliceState) => state.wishListPagination,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getWishListsAsync, createWishListAsync, deleteProductFromWishListAsync } = wishListsSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectWishListPagination, selectWishLists } = wishListsSlice.selectors;
export const wishListsReducer = wishListsSlice.reducer;