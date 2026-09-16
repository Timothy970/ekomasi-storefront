				if (response?.status_code == 200) {
					fetchUserProfile(response?.message, "success")
				} else {
					fetchUserProfile(response?.message || "Unable to update user profile", "error")

				}

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
		subscribeAsync: create.asyncThunk(
			async ({ email, handleSubscribe }: { email: string, handleSubscribe: (message: string, type: ToastType) => void }) => {
				const response = await subscribe(email)

				if (response?.status_code == 201) {
					handleSubscribe(response?.message, "success")
				} else {
					handleSubscribe(response?.message || "Unable to subscribe", "error")

				}

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
					} else {
						state.success = false
						state.message = action.payload?.message || "Failed to subscribe."
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
		selectOtpResendExpiry: (state: UserSliceState) => state.otpResendExpiry ?? null,
	},
});

// Export actions and selectors
export const { signUpUserAsync, signInUserAsync, resetSuccess, resetStatus, setOtpResendExpiry, resetOtpResendExpiry, resetMessage, requestOtpAsync, addReviewAsync, verifyOtpAsync, getUserProfileAsync, logout, updateUserProfileAsync, editReviewAsync, subscribeAsync, updateUserProfileVerifyAsync } = userSlice.actions; // Export actions
export const { selectUser, selectStatus, selectOtpResendExpiry, selectSuccess, selectUserToken, selectMessage, selectPhoneOrEmailValue, selectUserProfile, selectExpiresIn, selectUserRefreshToken } = userSlice.selectors;
export const userReducer = userSlice.reducer;