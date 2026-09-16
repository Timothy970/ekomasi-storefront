import { RootState } from "@/lib/store";

export const selectUser = (state: RootState) => state.user.user || null;
export const selectExpiresIn = (state: RootState) => state.user.expiresIn || null;
export const selectUserProfile = (state: RootState) => state.user.userProfile || null;
export const selectStatus = (state: RootState) => state.user.status;
export const selectSuccess = (state: RootState) => state.user.success;
export const selectMessage = (state: RootState) => state.user.message;
export const selectUserToken = (state: RootState) => state.user.token || null;
export const selectUserRefreshToken = (state: RootState) => state.user.refresh_token || null;
export const selectPhoneOrEmailValue = (state: RootState) => state.user.phoneOrEmailValue || "";
export const selectOtpResendExpiry = (state: RootState) => state.user.otpResendExpiry ?? null;
