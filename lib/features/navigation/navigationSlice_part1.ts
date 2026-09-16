import { createAppSlice } from "@/lib/createAppSlice";
import { Category, FeaturedProduct, FlashSaleDealData, FlashSaleDealsData, HomeBannerInfo, HomeDataWrapper, MinMaxData, Pagination, Partner, Product, ProductBundleData, ProductFeature, Review, SingleReview, StaticContent, SubcategoryProducts, Warehouse, } from "../types";
import { getBanners, getCategories, getCategoryById, getDealById, getDeals, getFeaturedProducts, getHomeDate, getMinMaxPriceRange, getPartners, getProduct, getProductBundles, getProductFeatures, getProductReview, getProductReviews, getStaticContents, getSubCategoryById, getWarehouses } from "./navigationAPI";

export type Status = "idle" | "loading" | "failed";

interface NavigationSliceState {
	categories: Category[] | null;
	category: Category | null;
	subcategory: SubcategoryProducts | null;
	status: Status;
	productStatus: Status;
	dealsStatus: Status;
	message: string;
	success: boolean;
	homeData: HomeDataWrapper | null;
	pagination: Pagination | null;
	featured: FeaturedProduct[] | null;
	product: Product | null;
	minMaxPriceRange: MinMaxData | null;
	staticContents: StaticContent[] | [];
	productFeatures: ProductFeature[] | [];
	productReviews: Review | null;
	productReview: SingleReview | null;
	productBundles: ProductBundleData | null;
	deals: FlashSaleDealsData | null;
	deal: FlashSaleDealData | null;
	reviewPagination: Pagination | null;
	wareHousePagination: Pagination | null;
	warehouses: Warehouse[] | null;
	banners: HomeBannerInfo[] | null;
	partners: Partner[] | null;
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
	staticContents: [],
	productFeatures: [],
	productReviews: null,
	productReview: null,
	productBundles: null,
	deals: null,
	dealsStatus: "idle",
	deal: null,
	reviewPagination: null,
	wareHousePagination: null,
	warehouses: null,
	banners: null,
	partners: null,
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
		getStaticContentsAsync: create.asyncThunk(
			async () => {
				const response = await getStaticContents()
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.data) {
						state.success = true
						state.message = action.payload?.message
						state.staticContents = action?.payload?.data
					} else {
						state.success = false
						state.message = action.payload?.message
						state.staticContents = []
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
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
				const response = await getSubCategoryById(id, query, page, size);
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
		getDealByIdAsync: create.asyncThunk(
			async (deal_id: string) => {
				const response = await getDealById(deal_id);
				return response;
			},
			{
				pending: (state) => {
					state.dealsStatus = "loading";
				},
				fulfilled: (state, action) => {
					state.dealsStatus = "idle";

					if (action.payload?.status_code === 200) {
						state.success = true;
						state.deal = action.payload.data;
					} else {
						state.success = false;
						state.deal = null;
					}
				},
				rejected: (state, action) => {
					state.dealsStatus = "failed";
					state.success = false;
					state.deal = null;
				},
			}
		),
		getProductBundlesAsync: create.asyncThunk(
			async ({ query }: { query: string }) => {
				const response = await getProductBundles(query);
				return response;
			},
			{
				pending: (state) => {
					state.productStatus = "loading";
				},
				fulfilled: (state, action) => {
					state.productStatus = "idle";

					if (action.payload?.status_code === 200 || action.payload?.status_code === 201) {
						state.productBundles = action.payload.data;
						state.pagination = action.payload.data?.pagination;
					} else {
						state.productBundles = null;
						state.pagination = null;
					}
				},
				rejected: (state) => {
					state.productBundles = null;
					state.pagination = null;
					state.productStatus = "failed";
				},
			}
		),
		getProductReviewsAsync: create.asyncThunk(
			async (product_id: string) => {
				const response = await getProductReviews(product_id);
				return response;
			},
			{
				pending: () => {
				},
				fulfilled: (state, action) => {
