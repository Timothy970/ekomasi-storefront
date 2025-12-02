import { createAppSlice } from "../createAppSlice";
import { ToastType } from "../features/toast/toastSlice";
import { BuyVoucherPayload, CreateVoucherPayload, Design, Pagination, SingleVoucher, Voucher } from "../features/types";
import { buyVoucher, createVoucher, getSingleVoucher, getVoucherDesigns } from "./voucherAPI";

interface VoucherSliceState {
	designs: Design[];
	vouchers: Voucher[];
	singleVoucher: SingleVoucher | null;
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
	pagination: Pagination | null;
	voucher: Voucher | null;
}

const initialState: VoucherSliceState = {
	vouchers: [],
	singleVoucher: null,
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
		createVoucherAsync: create.asyncThunk(
			async ({ payload, handleVoucherPurchase }: { payload: CreateVoucherPayload, handleVoucherPurchase: (message: string, type: ToastType) => void }) => {
				const response = await createVoucher(payload);

				if (response?.status_code === 201) {
					handleVoucherPurchase(response?.message, "success");
				} else {
					handleVoucherPurchase(response?.message, "error");
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
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getVoucherDesignsAsync, createVoucherAsync, getSingleVoucherAsync, buyVoucherAsync } = voucherSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectPagination, selectMessage, selectVoucher, selectVouchers, selectDesigns, selectSingleVoucher } = voucherSlice.selectors;
export const voucherReducer = voucherSlice.reducer;