"use client";
import { logout } from "@/lib/features/user/userSlice";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setStore } from "@/lib/storeRef";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  setStore(storeRef.current);

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);

      const checkToken = () => {
        const state = storeRef.current!.getState() as any;
        const auth = state.user;

        if (auth?.expiresAt && Date.now() >= auth.expiresAt) {
          storeRef.current!.dispatch(logout());
        }
      };

      const interval = setInterval(checkToken, 1000 * 30); // check every 30s

      return () => {
        unsubscribe();
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
};
