import { createAppSlice } from "@/lib/createAppSlice";
import { Category, HomeDataWrapper,  } from "../types";
import { getCategories, getHomeDate } from "./navigationAPI";

interface NavigationSliceState {
	categories: Category[] | null;
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	homeData: HomeDataWrapper | null;
}

const initialState: NavigationSliceState = {
	categories: null,
	homeData: null,
	status: "idle",
	message: "",
	success: false,
};

export const navigationSlice = createAppSlice({
	name: "navigation",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		getCategoriesAsync: create.asyncThunk(
			async () => {
				const response = await getCategories();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.categories = action.payload.data;
						state.message = action.payload.message;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
				},
			}
		),
		getHomeDataAsync: create.asyncThunk(
			async () => {
				const response = await getHomeDate();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.homeData = action.payload.data;
						state.message = action.payload.message;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
				},
			}
		),

	}),
	selectors: {
		selectCategories: (state: NavigationSliceState) => state.categories || null,
		selectHomeData: (state: NavigationSliceState) => state.homeData?.data || null,
		selectStatus: (state: NavigationSliceState) => state.status,
		selectSuccess: (state: NavigationSliceState) => state.success,
		selectMessage: (state: NavigationSliceState) => state.message,
	},
});

// Export actions and selectors
export const { getCategoriesAsync, getHomeDataAsync } = navigationSlice.actions; // Export actions
export const { selectCategories, selectHomeData } = navigationSlice.selectors;
export const navigationReducer = navigationSlice.reducer;