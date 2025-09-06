import { showToast, ToastType } from "@/lib/features/toast/toastSlice";
import { getStore } from "@/lib/storeRef";

/**
 * Trigger a toast globally without needing dispatch
 */
export const triggerToast = (message: string, type: ToastType = "info") => {
    getStore().dispatch(showToast({ message, type }));
};
