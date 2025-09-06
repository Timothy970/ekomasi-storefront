import { createAppSlice } from "@/lib/createAppSlice";

export type ToastType = "success" | "error" | "info";

interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
}

const initialState: ToastState = {
  open: false,
  message: "",
  type: "info",
};

export const toastSlice = createAppSlice({
  name: "toast",
  initialState,
  reducers: (create) => ({
    showToast: create.reducer(
      (state, action: { payload: { message: string; type?: ToastType } }) => {
        state.open = true;
        state.message = action.payload.message;
        state.type = action.payload.type ?? "info";
      }
    ),
    hideToast: create.reducer((state) => {
      state.open = false;
      state.message = "";
      state.type = "info";
    }),
  }),
  selectors: {
    selectToast: (state: ToastState) => state,
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const { selectToast } = toastSlice.selectors;
export const toastReducer = toastSlice.reducer;
