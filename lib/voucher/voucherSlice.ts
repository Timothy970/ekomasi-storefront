import { createAppSlice } from "../createAppSlice";
import { BuyVoucherPayload, CreateVoucherPayload, Design, Pagination, SingleVoucher, Voucher, VoucherPurchase } from "../features/types";
import { buyVoucher, createVoucher, deleteSingleVoucher, deleteVoucherDesign, getSingleVoucher, getSingleVoucherPurchase, getVoucherDesigns, getVoucherPurchases, getVouchers, updateBuyVoucher, updateVoucherDesign, uploadVoucherDesign } from "./voucherAPI";

interface VoucherSliceState {
	designs: Design[];
	vouchers: Voucher[];
	singleVoucher: SingleVoucher | null;
	voucherPurchases: VoucherPurchase[];
	voucherPurchase: VoucherPurchase | null;
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	pagination: Pagination | null;
	voucher: Voucher | null;
}

const initialState: VoucherSliceState = {
	vouchers: [],
	singleVoucher: null,
	voucherPurchases: [],
	voucherPurchase: null,
	designs: [],
	status: "idle",
	message: "",
	success: false,
	pagination: null,
	voucher: null,
};

export const voucherSlice = createAppSlice({
	name: "voucher",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		getVouchersAsync: create.asyncThunk(
			async (query: string) => {
				const response = await getVouchers(query);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = action?.payload?.data?.pagination
						state.vouchers = action?.payload?.data?.vouchers
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get vouchers."
						state.pagination = null
						state.voucher = null
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
		getVoucherDesignsAsync: create.asyncThunk(
			async (query: string) => {
				const response = await getVoucherDesigns(query);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = action?.payload?.data?.pagination
						state.designs = action?.payload?.data?.designs
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get vouchers."
						state.pagination = null
						state.voucher = null
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
		uploadVoucherDesignAsync: create.asyncThunk(
			async ({ formData, refetchAndRedirect }: { formData: FormData; refetchAndRedirect: (isSuccess: boolean) => void }) => {
				const response = await uploadVoucherDesign(formData);
				if (response?.status_code === 201) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					// if (action.payload?.status_code === 201) {
					// 	state.success = true
					// 	state.message = action.payload?.message
					// 	state.pagination = action?.payload?.data?.pagination
					// 	state.designs = action?.payload?.data?.designs
					// } else {
					// 	state.success = false
					// 	state.message = action.payload?.message || "Failed to upload voucher design."
					// 	state.pagination = null
					// 	state.voucher = null
					// }
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
		createVoucherAsync: create.asyncThunk(
			async ({payload, refetchAndRedirect}: {payload: CreateVoucherPayload, refetchAndRedirect: (isSuccess: boolean) => void}) => {
				const response = await createVoucher(payload);
				if (response?.status_code === 201) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					// if (action.payload?.status_code === 201) {
					// 	state.success = true
					// 	state.message = action.payload?.message
					// 	state.pagination = action?.payload?.data?.pagination
					// 	state.vouchers = action?.payload?.data?.vouchers
					// } else {
					// 	state.success = false
					// 	state.message = action.payload?.message || "Failed to create voucher."
					// 	state.pagination = null
					// 	state.voucher = null
					// }
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
		getSingleVoucherAsync: create.asyncThunk(
			async (voucherId: string) => {
				const response = await getSingleVoucher(voucherId);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = null
						state.singleVoucher = action?.payload?.data
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get voucher."
						state.pagination = null
						state.singleVoucher = null
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
		deleteSingleVoucherAsync: create.asyncThunk(
			async (voucherId: string) => {
				const response = await deleteSingleVoucher(voucherId);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = null
						state.singleVoucher = action?.payload?.data
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to delete voucher."
						state.pagination = null
						state.singleVoucher = null
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
		deleteVoucherDesignAsync: create.asyncThunk(
			async ({id, refetchAndRedirect}: {id: string, refetchAndRedirect: (isSuccess: boolean) => void}) => {
				const response = await deleteVoucherDesign(id);
				if (response?.status_code === 200) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					// if (action.payload?.status_code === 200) {
					// 	state.success = true
					// 	state.message = action.payload?.message
					// 	state.pagination = action?.payload?.data?.pagination
					// 	state.designs = action?.payload?.data?.designs
					// } else {
					// 	state.success = false
					// 	state.message = action.payload?.message || "Failed to get vouchers."
					// 	state.pagination = null
					// 	state.voucher = null
					// }
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
		getVoucherPurchasesAsync: create.asyncThunk(
			async (query: string) => {
				const response = await getVoucherPurchases(query);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = action?.payload?.data?.pagination
						state.voucherPurchases = action?.payload?.data?.vouchers
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get voucher."
						state.pagination = null
						state.voucherPurchases = []
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
		getSingleVoucherPurchaseAsync: create.asyncThunk(
			async (id: string) => {
				const response = await getSingleVoucherPurchase(id);
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message
						state.pagination = null
						state.voucherPurchase = action?.payload?.data
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get voucher purchase."
						state.pagination = null
						state.voucherPurchase = null
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
		updateVoucherDesignAsync: create.asyncThunk(
			async ({ voucherID, formData, refetchAndRedirect }: { voucherID: string; formData: FormData; refetchAndRedirect: (isSuccess: boolean) => void }) => {
				const response = await updateVoucherDesign(voucherID, formData);
			if (response?.status_code === 200) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
				
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
		buyVoucherAsync: create.asyncThunk(
			async ({ payload, refetchAndRedirect }: { payload: BuyVoucherPayload; refetchAndRedirect: (isSuccess: boolean) => void }) => {
				const response = await buyVoucher(payload);
				if (response?.status_code === 201) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
		updateBuyVoucherAsync: create.asyncThunk(
			async ({ payload, id, refetchAndRedirect }: { payload: BuyVoucherPayload; id: string; refetchAndRedirect: (isSuccess: boolean) => void }) => {
				const response = await updateBuyVoucher({ payload, id });
				if (response?.status_code === 200) {
					refetchAndRedirect(true);
				} else {
					refetchAndRedirect(false);
				}
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = ""
				},
			}
		),
	}),
	
	selectors: {
		selectDesigns: (state: VoucherSliceState) => state.designs,
		selectVouchers: (state: VoucherSliceState) => state.vouchers,
		selectStatus: (state: VoucherSliceState) => state.status,
		selectSuccess: (state: VoucherSliceState) => state.success,
		selectMessage: (state: VoucherSliceState) => state.message,
		selectPagination: (state: VoucherSliceState) => state.pagination,
		selectVoucher: (state: VoucherSliceState) => state.voucher,
		selectSingleVoucher: (state: VoucherSliceState) => state.singleVoucher,
		selectVoucherPurchases: (state: VoucherSliceState) => state.voucherPurchases,
		selectVoucherPurchase: (state: VoucherSliceState) => state.voucherPurchase,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getVouchersAsync, getVoucherDesignsAsync, uploadVoucherDesignAsync, createVoucherAsync, getSingleVoucherAsync, deleteSingleVoucherAsync, deleteVoucherDesignAsync, getVoucherPurchasesAsync, updateVoucherDesignAsync, buyVoucherAsync, getSingleVoucherPurchaseAsync, updateBuyVoucherAsync } = voucherSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectPagination, selectMessage, selectVoucher, selectVouchers, selectDesigns, selectSingleVoucher, selectVoucherPurchases, selectVoucherPurchase } = voucherSlice.selectors;
export const voucherReducer = voucherSlice.reducer;