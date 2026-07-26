"use client";
import CheckoutCartSummary from "@/components/CheckoutCartSummary";
import Navigation from "@/components/Navigation";
import PersonalInformation from "@/components/PersonalInformation";
import { selectCart, selectCartId } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import { ShoppingBag } from "lucide-react";

export default function GuestCheckout() {
  const cart = useAppSelector(selectCart);
  const cartId = useAppSelector(selectCartId);

  if (!cart) {
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 max-w-sm">
            It looks like you haven’t added anything to your cart yet. Browse products to get started.
          </p>
          <a
            href="/"
            className="mt-4 px-5 py-2.5 rounded-full bg-primary-tenant text-white hover:opacity-90 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <div className="w-full px-[1rem] lg:px-[3rem] mx-auto max-w-[90rem]">
        <div className="w-full flex flex-col md:flex-row-reverse md:gap-x-[2rem] mt-[2] lg:mt-[2.5rem]">
          <div className="w-full">
            <CheckoutCartSummary
              cartId={cartId}
              cart={cart}
              isBuyNow={false}
            />
          </div>

          <PersonalInformation
            cart={cart}
            page="guest"
            isBuyNow={false}
          />
        </div>
      </div>
    </Navigation>
  );
}
