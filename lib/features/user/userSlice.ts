import { createAppSlice } from "@/lib/createAppSlice";
import { OtpRequestParams, SignInParams, SignUpParams, UpdateUserProfilePayload, User, UserData, VerifyOtpParams } from "../types";
import { getUserProfile, requestOtp, signIn, signUpUser, updateUserProfile, verifyOtp } from "./userAPI";

interface UserSliceState {
	user: User | null;
	phoneOrEmailValue: string;
	status: "idle" | "loading" | "failed";
	googleStatus: "idle" | "loading" | "failed";
	message: string;
	token: string | null;
	refresh_token: string | null;
	success: boolean;
	expiresIn: number | null;
	userProfile: UserData | null;
}

const initialState: UserSliceState = {
	user: null,
	status: "idle",
	message: "",
	token: "",
	refresh_token: "",
	success: false,
	googleStatus: "idle",
	phoneOrEmailValue: "",
	expiresIn: null,
	userProfile: null,
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
		setToken: create.reducer<{ token: string; refresh_token: string }>((state, action) => {
			state.token = action.payload.token;
			state.refresh_token = action.payload.refresh_token;
		}),
		logout: create.reducer((state) => {
			state.token = null
			state.refresh_token = null
			state.expiresIn = null
			state.userProfile = null
			state.phoneOrEmailValue = ""
			state.googleStatus = "idle"
			state.success = false
			state.message = ""
			state.status = "idle"
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
					if (action.payload?.status_code === 200 || action.payload?.status_code === 201) {
						state.success = true;
						state.message = "Account created successfully. Please check your email/phone for activation.";
						state.phoneOrEmailValue = action.meta.arg.phone_number || action.meta.arg.email || "";
					}

					if (action.payload?.status_code == 409) {
						state.message = "User with this email already exists"
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
					if (action.payload?.status_code === 200 || action.payload?.status_code === 201) {
						state.phoneOrEmailValue = action.meta.arg.phone_number || action.meta.arg.email || ""
						state.message = "OTP sent"
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
					if (action.payload?.status_code === 200 || action.payload?.status_code === 201) {
						state.success = true
						state.message = "Verification successful"
						state.token = action.payload?.data?.token ?? ""
						state.refresh_token = action.payload?.data?.refresh_token ?? ""
						state.expiresIn = Date.now() + action.payload?.data?.expires_in * 1000
					} else {
						state.success = false
						state.message = "Invalid or expired OTP"
						state.expiresIn = null
						state.token = null
						state.refresh_token = null
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
		getUserProfileAsync: create.asyncThunk(
			async () => {
				const response = await getUserProfile()
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
						state.userProfile = action.payload.data
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to get user profile."
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
		updateUserProfileAsync: create.asyncThunk(
			async ({ data, fetchUserProfile }: { data: UpdateUserProfilePayload, fetchUserProfile: () => void }) => {
				const response = await updateUserProfile({ data })
				fetchUserProfile()

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
						state.message = action.payload?.message || "Failed to get user profile."
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
		selectExpiresIn: (state: UserSliceState) => state.expiresIn || null,
		selectUserProfile: (state: UserSliceState) => state.userProfile || null,
		selectStatus: (state: UserSliceState) => state.status,
		selectSuccess: (state: UserSliceState) => state.success,
		selectMessage: (state: UserSliceState) => state.message,
		selectUserToken: (state: UserSliceState) => state.token || null,
		selectUserRefreshToken: (state: UserSliceState) => state.refresh_token || null,
		selectPhoneOrEmailValue: (state: UserSliceState) => state.phoneOrEmailValue || "",
	},
});

// Export actions and selectors
export const { signUpUserAsync, signInUserAsync, resetSuccess, resetMessage, requestOtpAsync, verifyOtpAsync, getUserProfileAsync, logout, updateUserProfileAsync } = userSlice.actions; // Export actions
export const { selectUser, selectStatus, selectSuccess, selectUserToken, selectMessage, selectPhoneOrEmailValue, selectUserProfile, selectExpiresIn, selectUserRefreshToken } = userSlice.selectors;
export const userReducer = userSlice.reducer;