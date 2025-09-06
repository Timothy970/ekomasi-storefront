import { createAppSlice } from "@/lib/createAppSlice";
import { OtpRequestParams, SignInParams, SignUpParams, User, VerifyOtpParams } from "../types";
import { requestOtp, signIn, signUpUser, verifyOtp } from "./userAPI";

interface UserSliceState {
	user: User | null;
	phoneOrEmailValue: string;
	status: "idle" | "loading" | "failed";
	googleStatus: "idle" | "loading" | "failed";
	message: string;
	token: string | null;
	success: boolean;
	expiresIn: number | null;
}

const initialState: UserSliceState = {
	user: null,
	status: "idle",
	message: "",
	token: "",
	success: false,
	googleStatus: "idle",
	phoneOrEmailValue: "",
	expiresIn: null,
};

export const userSlice = createAppSlice({
	name: "user",
	initialState,
	reducers: (create) => ({
		resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
		resetMessage: create.reducer((state) => {
			state.message = "";
		}),
		signUpUserAsync: create.asyncThunk(
			async (user: SignUpParams) => {
				const response = await signUpUser(user);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.message == "OTP sent") {
						state.phoneOrEmailValue = action.meta.arg.phone_number || action.meta.arg.email || ""
					}
					if (action.payload?.status_code == 409) {
						state.message = "User with this email already exists"
					}
					if (action.payload?.status_code == 200) {
						state.success = true;
					}
					state.status = "idle";
				},
				rejected: (state) => {
					state.status = "failed";
					state.message = "";
					state.success = false;
				},
			},
		),
		signInUserAsync: create.asyncThunk(
			async (user: SignInParams) => {
				const response = await signIn(user);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.message == "OTP sent") {
						state.phoneOrEmailValue = action.meta.arg.phone_number || action.meta.arg.email || ""
						state.message = action.payload?.message
					}

					if (action.payload?.status_code == 200) {
						state.success =
							true;
					}
					state.status = "idle";
				},
				rejected: (state) => {
					state.status = "failed";
					state.message = "";
					state.success = false;
				},
			},
		),
		requestOtpAsync: create.asyncThunk(
			async (params: OtpRequestParams) => {
				const response = await requestOtp(params)
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.message) {
						state.message = action.payload.message
						state.phoneOrEmailValue = action.meta.arg.phone_number || action.meta.arg.email || ""
					}
					state.status = "idle"
				},
				rejected: (state) => {
					state.status = "failed"
					state.message = ""
				},
			}
		),
		verifyOtpAsync: create.asyncThunk(
			async (payload: VerifyOtpParams) => {
				const response = await verifyOtp(payload)
				return response
			},
			{
				pending: (state) => {
					state.status = "loading"
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true
						state.message = action.payload?.message || "Verification successful"
						state.token = action.payload?.data?.token ?? ""
						state.expiresIn = action.payload?.data?.expires_in ?? 0
					} else {
						state.success = false
						state.message = action.payload?.message || "Invalid or expired OTP"
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
		selectUser: (state: UserSliceState) => state.user || null,
		selectStatus: (state: UserSliceState) => state.status,
		selectSuccess: (state: UserSliceState) => state.success,
		selectMessage: (state: UserSliceState) => state.message,
		selectUserToken: (state: UserSliceState) => state.token || null,
		selectPhoneOrEmailValue: (state: UserSliceState) => state.phoneOrEmailValue || "",
	},
});

// Export actions and selectors
export const { signUpUserAsync, signInUserAsync, resetSuccess, resetMessage, requestOtpAsync, verifyOtpAsync } = userSlice.actions; // Export actions
export const { selectUser, selectStatus, selectSuccess, selectUserToken, selectMessage, selectPhoneOrEmailValue } = userSlice.selectors;
export const userReducer = userSlice.reducer;