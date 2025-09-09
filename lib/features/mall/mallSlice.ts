import { createAppSlice } from "@/lib/createAppSlice";
import { VariantGroup } from "../types";
import { getVariants } from "./mallAPI";

interface MallSliceState {
	variants: VariantGroup[] | [];
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
}

const initialState: MallSliceState = {
	status: "idle",
	message: "",
	success: false,
	variants: [],
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

	}),
	selectors: {
		selectVariants: (state: MallSliceState) => state.variants,
		selectStatus: (state: MallSliceState) => state.status,
		selectSuccess: (state: MallSliceState) => state.success,
		selectMessage: (state: MallSliceState) => state.message,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, getVariantsAsync } = mallSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectVariants } = mallSlice.selectors;
export const mallReducer = mallSlice.reducer;