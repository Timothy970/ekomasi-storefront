					if (action.payload?.status_code === 200) {
						state.productReviews = action.payload.data?.reviews;
						state.reviewPagination = action?.payload.data?.pagination
					} else {
						state.productReviews = null;
						state.reviewPagination = null;
					}
				},
				rejected: (state) => {
					state.productReviews = null;
				},
			}
		),
		getProductReviewAsync: create.asyncThunk(
			async ({ product_id, review_id }: { product_id: string; review_id: string }) => {
				const response = await getProductReview(product_id, review_id);
				return response;
			},
			{
				pending: () => {
				},
				fulfilled: (state, action) => {

					if (action.payload?.status_code === 200) {
						state.productReview = action.payload.data?.reviews?.[0];
					} else {
						state.productReview = null;
					}
				},
				rejected: (state) => {
					state.productReview = null;
				},
			}
		),
		getProductFeaturesAsync: create.asyncThunk(
			async (product_id: string) => {
				const response = await getProductFeatures(product_id);
				return response;
			},
			{
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.productFeatures = action.payload.data;
					} else {
						state.productFeatures = [];
					}
				},
				rejected: (state) => {
					state.productFeatures = [];
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
		getDealsAsync: create.asyncThunk(
			async ({ query }: { query: string }) => {
				const response = await getDeals(query);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.deals = action.payload.data;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.deals = null;
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
		getWarehousesAsync: create.asyncThunk(
			async () => {
				const response = await getWarehouses();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 201) {
						state.warehouses = action.payload.data?.data;
						state.success = true;
						state.wareHousePagination = action?.payload?.data?.meta
					} else {
						state.message = action.payload?.message || "Failed to fetch warehouses";
						state.success = false;
						state.warehouses = null;
						state.wareHousePagination = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
					state.wareHousePagination = null
				},
			}
		),
		getBannersAsync: create.asyncThunk(
			async () => {
				const response = await getBanners();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.banners = action?.payload?.data || null;
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
		getPartnersAsync: create.asyncThunk(
			async () => {
				const response = await getPartners();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.partners = action.payload.data;
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
		selectProductBundles: (state: NavigationSliceState) => state.productBundles || null,
		selectSubCategory: (state: NavigationSliceState) => state.subcategory || null,
		selectPagination: (state: NavigationSliceState) => state.pagination || null,
		selectHomeData: (state: NavigationSliceState) => state.homeData?.data || null,
		selectStatus: (state: NavigationSliceState) => state.status,
		selectProductStatus: (state: NavigationSliceState) => state.productStatus,
		selectSuccess: (state: NavigationSliceState) => state.success,
		selectMessage: (state: NavigationSliceState) => state.message,
		selectMinMaxPriceRange: (state: NavigationSliceState) => state.minMaxPriceRange,
		selectStaticContents: (state: NavigationSliceState) => state.staticContents || [],
		selectProductFeatures: (state: NavigationSliceState) => state.productFeatures || [],
		selectDeals: (state: NavigationSliceState) => state.deals || null,
		selectDeal: (state: NavigationSliceState) => state.deal || null,
		selectDealStatus: (state: NavigationSliceState) => state.dealsStatus || null,
		selectProductReviews: (state: NavigationSliceState) => state.productReviews || null,
		selectProductReview: (state: NavigationSliceState) => state.productReview || null,
		selectReviewPagination: (state: NavigationSliceState) => state.reviewPagination || null,
		selectWarehouses: (state: NavigationSliceState) => state.warehouses,
		selectWarehousePagination: (state: NavigationSliceState) => state.wareHousePagination,
		selectBanners: (state: NavigationSliceState) => state.banners || null,
		selectPartners: (state: NavigationSliceState) => state.partners || null,
	},
});

// Export actions and selectors
export const { getCategoriesAsync, getHomeDataAsync, getCategoryAsync, getWarehousesAsync, getProductAsync, getDealsAsync, getDealByIdAsync, getProductBundlesAsync, getStaticContentsAsync, getProductFeaturesAsync, getProductReviewsAsync, getMinMaxPriceRangeAsync, getSubCategoryAsync, getFeaturedProductsAsync, getProductReviewAsync, getBannersAsync, getPartnersAsync } = navigationSlice.actions;
export const { selectCategories, selectHomeData, selectCategory, selectWarehouses, selectProductReviews, selectReviewPagination, selectDeals, selectDealStatus, selectDeal, selectProductBundles, selectStaticContents, selectProductFeatures, selectMinMaxPriceRange, selectStatus, selectSubCategory, selectPagination, selectFeatured, selectProduct, selectProductStatus, selectProductReview, selectBanners, selectPartners } = navigationSlice.selectors;
export const navigationReducer = navigationSlice.reducer;