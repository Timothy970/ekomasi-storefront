// store/storeRef.ts

import { AppStore } from "./store";

let storeRef: AppStore | null = null;

export const setStore = (store: AppStore) => {
  storeRef = store;
};

export const getStore = () => {
  if (!storeRef) {
    throw new Error("Store has not been set. Call setStore() in your Provider.");
  }
  return storeRef;
};
