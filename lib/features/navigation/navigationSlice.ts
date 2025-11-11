import { createAppSlice } from "@/lib/createAppSlice";
import { Category, FeaturedProduct, HomeDataWrapper, MinMaxData, Pagination, Product, SubcategoryProducts, } from "../types";
import { getCategories, getCategoryById, getFeaturedProducts, getHomeDate, getMinMaxPriceRange, getProduct, getSubCategoryById } from "./navigationAPI";

interface NavigationSliceState {
	categories: Category[] | null;
	category: Category | null;
	subcategory: SubcategoryProducts | null;
	status: "idle" | "loading" | "failed";
	productStatus: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	homeData: HomeDataWrapper | null;
	pagination: Pagination | null;
	featured: FeaturedProduct[] | null;
	product: Product | null;
	minMaxPriceRange: MinMaxData | null;
}

const initialState: NavigationSliceState = {
	categories: null,
	subcategory: null,
	category: null,
	homeData: null,
	status: "idle",
	productStatus: "idle",
	message: "",
	success: false,
	pagination: null,
	featured: null,
	product: null,
	minMaxPriceRange: null,
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
						state.categories = action.payload.data?.categories;
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
		getCategoryAsync: create.asyncThunk(
			async ({ id, query }: { id: string; query: string }) => {
				const response = await getCategoryById(id, query);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					state.status = "idle";
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.category = action.payload.data.categories[0];
						state.pagination = action.payload.data.pagination;
					} else {
						state.success = false;
						state.category = null;
						state.pagination = null;
					}
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
				},
			}
		),
		getSubCategoryAsync: create.asyncThunk(
			async ({ id, page, size, query }: { id: string; page?: number; size?: number, query: string }) => {
				const response = await getSubCategoryById(id, page, size, query);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					state.status = "idle";

					if (action.payload?.status_code === 200) {
						state.success = true;
						state.subcategory = action.payload.data.products;
						state.pagination = action.payload.data.pagination;
					} else {
						state.success = false;
						state.subcategory = null;
						state.pagination = null;
					}
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
					state.subcategory = null;
					state.pagination = null;
				},
			}
		),
		getFeaturedProductsAsync: create.asyncThunk(
			async () => {
				const response = await getFeaturedProducts();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					state.status = "idle";

					if (action.payload?.status_code === 200) {
						state.success = true;
						state.featured = action.payload.data;
					} else {
						state.success = false;
						state.featured = null;
					}
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
					state.featured = null;
				},
			}
		),
		getProductAsync: create.asyncThunk(
			async (product_id: string) => {
				const response = await getProduct(product_id);
				return response;
			},
			{
				pending: (state) => {
					state.productStatus = "loading";
				},
				fulfilled: (state, action) => {
					state.productStatus = "idle";

					if (action.payload?.status_code === 200) {
						state.success = true;
						state.product = action.payload.data;
					} else {
						state.success = false;
						state.featured = null;
					}
				},
				rejected: (state, action) => {
					state.productStatus = "failed";
					state.message = action.error?.message ?? "";
					state.success = false;
					state.product = null;
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
		getMinMaxPriceRangeAsync: create.asyncThunk(
			async () => {
				const response = await getMinMaxPriceRange();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.minMaxPriceRange = action.payload.data;
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
		selectCategory: (state: NavigationSliceState) => state.category || null,
		selectFeatured: (state: NavigationSliceState) => state.featured || null,
		selectProduct: (state: NavigationSliceState) => state.product || null,
		selectSubCategory: (state: NavigationSliceState) => state.subcategory || null,
		selectPagination: (state: NavigationSliceState) => state.pagination || null,
		selectHomeData: (state: NavigationSliceState) => state.homeData?.data || null,
		selectStatus: (state: NavigationSliceState) => state.status,
		selectProductStatus: (state: NavigationSliceState) => state.productStatus,
		selectSuccess: (state: NavigationSliceState) => state.success,
		selectMessage: (state: NavigationSliceState) => state.message,
		selectMinMaxPriceRange: (state: NavigationSliceState) => state.minMaxPriceRange,
	},
});

// Export actions and selectors
export const { getCategoriesAsync, getHomeDataAsync, getCategoryAsync, getProductAsync, getMinMaxPriceRangeAsync, getSubCategoryAsync, getFeaturedProductsAsync } = navigationSlice.actions;
export const { selectCategories, selectHomeData, selectCategory, selectMinMaxPriceRange, selectStatus, selectSubCategory, selectPagination, selectFeatured, selectProduct, selectProductStatus } = navigationSlice.selectors;
export const navigationReducer = navigationSlice.reducer;