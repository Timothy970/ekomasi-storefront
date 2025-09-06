"use client";

import * as Toast from "@radix-ui/react-toast";
import { useEffect } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hideToast, selectToast } from "@/lib/features/toast/toastSlice";

export default function ToastProvider() {
  const { open, message, type } = useAppSelector(selectToast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) dispatch(hideToast());
        }}
        duration={3000}
        className={clsx(
          "px-4 py-3 rounded shadow-lg text-white font-medium transition-all",
          type === "success" && "bg-green-600",
          type === "error" && "bg-red-600",
          type === "info" && "bg-blue-600"
        )}
      >
        <Toast.Title>{message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 w-80" />
    </Toast.Provider>
  );
}
