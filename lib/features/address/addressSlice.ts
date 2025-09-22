import { createAppSlice } from "@/lib/createAppSlice";
import { Address, MyAddress, UserAddressPayload } from "../types";
import { deleteUserAddress, editUserAddress, getUserAddress, postUserAddress } from "./addressAPI";

interface addressSliceState {
	address: MyAddress[] | null;
	status: "idle" | "loading" | "failed";
	message: string;
	success: boolean;
}

const initialState: addressSliceState = {
	address: null,
	status: "idle",
	message: "",
	success: false,
};

export const addressSlice = createAppSlice({
	name: "address",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		createUserAddressAsync: create.asyncThunk(
			async ({ data, refetchAddress }: { data: UserAddressPayload, refetchAddress: () => void }) => {
				const response = await postUserAddress(data)
				refetchAddress()
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

					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get user address."
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = "Invalid or expired OTP"
				},
			}
		),
		updateUserAddressAsync: create.asyncThunk(
			async ({ data, refetchAddress, address_id }: { data: UserAddressPayload, refetchAddress: () => void, address_id: string }) => {
				const response = await editUserAddress(data, address_id)
				refetchAddress()
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

					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get user address."
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = "Invalid or expired OTP"
				},
			}
		),
		deleteUserAddressAsync: create.asyncThunk(
			async ({ refetchAddress, address_id }: { refetchAddress: () => void, address_id: string }) => {
				const response = await deleteUserAddress(address_id)
				refetchAddress()
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

					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get user address."
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = "Invalid or expired OTP"
				},
			}
		),
		getUserAddressAsync: create.asyncThunk(
			async () => {
				const response = await getUserAddress()
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 201) {
						state.success = true
						state.message = action.payload?.message
						state.address = action.payload.data
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get user address."
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.success = false
					state.message = "Invalid or expired OTP"
				},
			}
		),
	}),
	selectors: {
		selectAddress: (state: addressSliceState) => state.address || null,
		selectStatus: (state: addressSliceState) => state.status,
		selectSuccess: (state: addressSliceState) => state.success,
		selectMessage: (state: addressSliceState) => state.message,
	},
});

// Export actions and selectors
export const { getUserAddressAsync, createUserAddressAsync, updateUserAddressAsync, deleteUserAddressAsync } = addressSlice.actions; // Export actions
export const { selectAddress, selectStatus, selectSuccess, selectMessage } = addressSlice.selectors;
export const addressReducer = addressSlice.reducer;