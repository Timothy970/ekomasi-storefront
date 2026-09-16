"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { triggerToast } from "@/app/utils/toastUtils";
import { applyPromoCodeDiscountAsync, setPromocode } from "@/lib/features/cart/cartSlice";
import { ToastType } from "@/lib/features/toast/toastSlice";

type PromocodeInputProps = {
  cartId: string | null;
  isBuyNow: boolean;
  locationId?: number | null;
};

export default function PromocodeInput({ cartId, isBuyNow, locationId }: Readonly<PromocodeInputProps>) {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.cart.promoCode || "");

  const handlePromocodeRes = (message: string, errorType: ToastType) => {
    triggerToast(message, errorType);
  };

  const applyPromoCode = () => {
    if (!code.trim()) {
      triggerToast("Please enter a promo code.", "error");
      return;
    }

    if (cartId) {
      dispatch(
        applyPromoCodeDiscountAsync({
          code,
          cart_id: cartId,
          location_id: locationId ?? null,
          handlePromocodeRes,
          isBuyNow: isBuyNow
        })
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPromocode(e.target.value));
  };

  return (
    <div className="w-full flex items-center justify-start mt-[0.75rem] gap-x-[1rem]">
      <Input
        placeholder="Promo Code"
        value={code}
        onChange={onChange}
        className="h-[2.5rem] max-w-[15rem] border-black text-[0.875rem]"
      />
      <Button
        onClick={applyPromoCode}
        disabled={!cartId}
        className="h-[2.5rem] border rounded-md bg-white text-custom-black"
      >
        Apply
      </Button>
    </div>
  );
}
