import { createAppSlice } from "@/lib/createAppSlice";
import { LocationData, Suggestion, VariantGroup } from "../types";
import { getLocations, getSearchAutocomplete, getVariants } from "./mallAPI";

interface MallSliceState {
	variants: VariantGroup[] | [];
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	locations: LocationData | null;
	autocomplete: Suggestion[] | null;
}

const initialState: MallSliceState = {
	status: "idle",
	message: "",
	success: false,
	variants: [],
	locations: null,
	autocomplete: null,
};

export const mallSlice = createAppSlice({
	name: "mall",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		getVariantsAsync: create.asyncThunk(
			async () => {
				const response = await getVariants();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.variants = action.payload.data;
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
		getLocationsAsync: create.asyncThunk(
			async () => {
				const response = await getLocations();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.locations = action.payload.data;
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch variants";
						state.success = false;
						state.locations = null;
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
		getSearchAutocompleteAsync: create.asyncThunk(
			async ({ query }: { query: string }) => {
				return await getSearchAutocomplete(query);
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.autocomplete = action.payload.data?.suggestions;
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch suggestions";
						state.success = false;
						state.autocomplete = null;
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
		selectVariants: (state: MallSliceState) => state.variants,
		selectAutocomplete: (state: MallSliceState) => state.autocomplete,
		selectStatus: (state: MallSliceState) => state.status,
		selectSuccess: (state: MallSliceState) => state.success,
		selectMessage: (state: MallSliceState) => state.message,
		selectLocations: (state: MallSliceState) => state.locations,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getVariantsAsync, getLocationsAsync, getSearchAutocompleteAsync } = mallSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectVariants, selectLocations, selectAutocomplete } = mallSlice.selectors;
export const mallReducer = mallSlice.reducer;