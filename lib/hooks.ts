// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = (): AppStore => useStore<AppStore>();