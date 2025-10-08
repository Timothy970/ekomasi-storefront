import { createAppSlice } from "@/lib/createAppSlice";
import { Filters, LocationData, Pagination, Product, Suggestion, VariantGroup } from "../types";
import { getLocations, getSearchAutocomplete, getSearchResults, getVariants } from "./mallAPI";

interface MallSliceState {
	variants: VariantGroup[] | [];
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	locations: LocationData | null;
	autocomplete: Suggestion[] | null;
	searchResults: null | Product[];
	searchFilters: Filters | null;
	pagination: Pagination | null;
	searchTerm: string,
}

const initialState: MallSliceState = {
	status: "idle",
	message: "",
	success: false,
	variants: [],
	locations: null,
	autocomplete: null,
	searchResults: null,
	searchFilters: null,
	pagination: null,
	searchTerm: "",
};

export const mallSlice = createAppSlice({
	name: "mall",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetSearchAutocomplete: create.reducer((state) => {
			state.autocomplete = null;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		setSearchTerm: create.reducer<string>((state, action) => {
			state.searchTerm = action.payload;
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
		getSearchProductsAsync: create.asyncThunk(
			async ({ query }: { query: string }) => {
				const response = await getSearchAutocomplete(query);
				return response;
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
		getSearchResultsAsync: create.asyncThunk(
			async ({ query }: { query: string }) => {
				const response = await getSearchResults(query);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.searchFilters = action.payload.data?.filters;
						state.searchResults = action.payload.data?.products;
						state.pagination = action.payload.data?.pagination;
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch search results";
						state.searchFilters = null
						state.success = false;
						state.searchResults = null;
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
		selectSearchResults: (state: MallSliceState) => state.searchResults,
		selectPagination: (state: MallSliceState) => state.pagination,
		selectSsearchFilters: (state: MallSliceState) => state.searchFilters,
		selectStatus: (state: MallSliceState) => state.status,
		selectSuccess: (state: MallSliceState) => state.success,
		selectMessage: (state: MallSliceState) => state.message,
		selectLocations: (state: MallSliceState) => state.locations,
		selectSearchTerm: (state: MallSliceState) => state.searchTerm,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, setSearchTerm, getVariantsAsync, getLocationsAsync, getSearchAutocompleteAsync, resetSearchAutocomplete, getSearchProductsAsync, getSearchResultsAsync } = mallSlice.actions; // Export actions
export const { selectStatus, selectSearchTerm, selectSuccess, selectMessage, selectVariants, selectLocations, selectAutocomplete, selectSearchResults, selectSsearchFilters, selectPagination } = mallSlice.selectors;
export const mallReducer = mallSlice.reducer;