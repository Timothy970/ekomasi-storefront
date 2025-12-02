import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import { navigationReducer } from "./features/navigation/navigationSlice";
import { toastReducer } from "./features/toast/toastSlice";
import { mallReducer } from "./features/mall/mallSlice";
import { cartReducer } from "./features/cart/cartSlice";
import { wishListsReducer } from "./features/wishlist/wishlistSlice";
import { addressReducer } from "./features/address/addressSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { getStore } from "./storeRef";
import { blogReducer } from "./blog/blogSlice";
import { returnReducer } from "./features/returns/returnSlice";
import { voucherReducer } from "./voucher/voucherSlice";

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  toast: toastReducer,
  mall: mallReducer,
  cart: cartReducer,
  wishlists: wishListsReducer,
  address: addressReducer,
  blog: blogReducer,
  returns: returnReducer,
  voucher: voucherReducer,
});

const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_REDUX_SECRET_KEY || "adenzo",
  onError: (error) => {
    console.error("Redux Persist encryption error:", error);
    try {
      const store = getStore();
      if (store?.__persistor) {
        store.__persistor.purge();
      }
    } catch (err) {
      console.warn("Failed to purge persisted state:", err);
    }

    try {
      const store = getStore();
      store.dispatch({ type: "user/logout" });
    } catch { }
  },
});

type RootReducerType = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerType> = {
  key: "user",
  storage,
  timeout: undefined,
  transforms: [encryptor],
};

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
