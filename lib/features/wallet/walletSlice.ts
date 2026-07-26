import { createAppSlice } from "../../createAppSlice";
import { TopupWalletPayload, WalletTransaction } from "../types";
import { getWalletBalance, topupWalletMpesa } from "./walletAPI";

interface WalletSliceState {
  balance: number;
  transactions: WalletTransaction[];
  status: "idle" | "loading" | "failed";
  message: string;
  success: boolean;
}

const initialState: WalletSliceState = {
  balance: 0,
  transactions: [],
  status: "idle",
  message: "",
  success: false,
};

export const walletSlice = createAppSlice({
  name: "wallet",
  initialState,
  reducers: (create) => ({
    getWalletBalanceAsync: create.asyncThunk(
      async (phone: string) => {
        const response = await getWalletBalance(phone);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          if (action.payload?.status_code === 200) {
            state.success = true;
            state.balance = action.payload?.data?.balance || 0;
            state.transactions = action.payload?.data?.transactions || [];
          } else {
            state.success = false;
          }
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
          state.success = false;
        },
      }
    ),
    topupWalletMpesaAsync: create.asyncThunk(
      async ({ payload, callback }: { payload: TopupWalletPayload; callback: (msg: string, success: boolean) => void }) => {
        try {
          const response = await topupWalletMpesa(payload);
          if (response?.status_code === 200) {
            callback("STK Push prompt sent to your phone!", true);
          } else {
            callback(`${response?.message || "Failed to initiate STK push"}`, false);
          }
          return response;
        } catch (err: any) {
          callback(`${err?.response?.data?.error || err?.message || "Failed to initiate top-up"}`, false);
          throw err;
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectWalletBalance: (state: WalletSliceState) => state.balance,
    selectWalletTransactions: (state: WalletSliceState) => state.transactions,
    selectWalletStatus: (state: WalletSliceState) => state.status,
    selectWalletMessage: (state: WalletSliceState) => state.message,
  },
});

export const { getWalletBalanceAsync, topupWalletMpesaAsync } = walletSlice.actions;
export const { selectWalletBalance, selectWalletTransactions, selectWalletStatus, selectWalletMessage } = walletSlice.selectors;
export const walletReducer = walletSlice.reducer;
