"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { triggerToast } from "@/app/utils/toastUtils";
import { applyPromoCodeDiscountAsync, setPromocode } from "@/lib/features/cart/cartSlice";
import { ToastType } from "@/lib/features/toast/toastSlice";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type PromocodeInputProps = {
  cartId: string | null;
  isBuyNow: boolean;
};

export default function PromocodeInput({ cartId, isBuyNow }: PromocodeInputProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const code = useAppSelector((state) => state.cart.promoCode || "");
  const id = searchParams.get("location_id");
  const num = Number(id);
  const locationId = !isNaN(num) && num > 0 ? num : null;
  const debounceDelay = 500;

  const handlePromocodeRes = (message: string, errorType: ToastType) => {
    triggerToast(message, errorType);
  };

  useEffect(() => {
    const promoFromUrl = searchParams.get("promo_code");
    if (promoFromUrl) {
      dispatch(setPromocode(promoFromUrl));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (code.trim() === "") {
        params.delete("promo_code");
        dispatch(setPromocode(null));
      } else {
        params.set("promo_code", code);
      }

      router.replace(`${pathname}?${params.toString()}`, undefined);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [code, dispatch, pathname, router, searchParams]);

  const applyPromoCode = () => {
    if (!code.trim()) {
      triggerToast("Please enter a promo code.", "error");
      return;
    }

    if (!locationId) {
      triggerToast("Please select shipping location", "error");
      return;
    }

    if (cartId) {
      dispatch(
        applyPromoCodeDiscountAsync({
          code,
          cart_id: cartId,
          location_id: locationId,
          handlePromocodeRes,
          isBuyNow: isBuyNow
        })
      );
    }
  };

  useEffect(() => {
    if (code.trim() === "" || !cartId || !locationId) return;

    const timeoutId = setTimeout(() => {
      dispatch(
        applyPromoCodeDiscountAsync({
          code,
          cart_id: cartId,
          location_id: locationId,
          handlePromocodeRes,
          isBuyNow: isBuyNow
        })
      );
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [cartId, locationId, dispatch, isBuyNow]);

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
