import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'
import { navigationReducer } from "./features/navigation/navigationSlice";
import { toastReducer } from "./features/toast/toastSlice";

const persistConfig = { key: "user", storage: storage };

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  toast: toastReducer,
});

const makeConfiguredStore = () => configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore()
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
      },
    })
    store.__persistor = persistStore(store)
    return store
  }
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
