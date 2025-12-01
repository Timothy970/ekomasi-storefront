import { createAppSlice } from "@/lib/createAppSlice";
import { CreateReturnPayload, Returns } from "../types";
import { createReturns, getUserReturn, getUserReturns } from "./returnAPI";


interface ReturnSliceState {
    returns: Returns[] | null;
    return: Returns | null;
    status: "idle" | "loading" | "failed";
    message: string;
    success: boolean;
}

const initialState: ReturnSliceState = {
    returns: null,
    return: null,
    status: "idle",
    message: "",
    success: false,
};

export const returnSlice = createAppSlice({
    name: "returns",
    initialState,
    reducers: (create) => ({
       	resetSuccess: create.reducer((state) => {
			state.success = false;
		}),
        setReturns: create.reducer<Returns[] | null>((state, action) => {
            state.returns = action.payload;
        }),
        setReturn: create.reducer<Returns | null>((state, action) => {
            state.return = action.payload;
        }),
        resetStatus: create.reducer((state) => {
            state.status = "idle";
        }
        ),
        setStatus: create.reducer<"idle" | "loading" | "failed">((state, action) => {
            state.status = action.payload;
        }),
        setMessage: create.reducer<string>((state, action) => {
            state.message = action.payload;
        }),
        createReturnsAsync: create.asyncThunk(
            async (payload: CreateReturnPayload) => {
                const response = await createReturns(payload);
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    if (action.payload?.status_code === 201){
                        state.success = true;
                        state.message = "Return created successfully.";
                        state.returns = action?.payload?.data || null;
                    }else{
                        state.success = false;
                        state.message = action.payload?.message || "Failed to create return.";
                        state.returns = null;
                    }
                    state.status = "idle";
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.success = false;
					state.message = "";
                },
            }
        ),
        getReturnsAsync: create.asyncThunk(
            async () => {
                const response = await getUserReturns();
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    if (action.payload?.status_code === 200){
                        state.success = true;
                        state.returns = action?.payload?.data || null;
                        state.message = action.payload?.message || "Returns fetched successfully.";
                    }else{
                        state.success = false;
                        state.message = action.payload?.message || "Failed to fetch returns.";
                        state.returns = null;
                    }
                    state.status = "idle";
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.success = false;
                    state.message = "";
                },
            }
        ),
        getReturnAsync: create.asyncThunk(
            async (id: string) => {
                const response = await getUserReturn(id);
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    if (action.payload?.status_code === 200){
                        state.success = true;
                        state.return = action?.payload?.data || null;
                        state.message = action.payload?.message || "Return fetched successfully.";
                    }else{
                        state.success = false;
                        state.message = action.payload?.message || "Failed to fetch return.";
                        state.return = null;
                    }
                    state.status = "idle";
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.success = false;
                    state.message = "";
                }
            }
        ),
    }),
    selectors: {
    selectReturns: (state) => state.returns || null,
    selectReturn: (state) => state.return || null,
    selectStatus: (state) => state.status,
    selectMessage: (state) => state.message,
    selectSuccess: (state) => state.success,
}
});

export const {
    resetSuccess,
    setReturns,
    setReturn,
    resetStatus,
    setStatus,
    setMessage,
    createReturnsAsync,
    getReturnsAsync,
    getReturnAsync,
} = returnSlice.actions;

export const {
    selectReturns,
    selectReturn,
    selectStatus,
    selectMessage,
    selectSuccess,
} = returnSlice.selectors;

export const returnReducer = returnSlice.reducer;