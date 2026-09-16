import { RootState } from "@/lib/store";

export const selectStatus = (state: RootState) => state.cart.status;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectBuyNowCart = (state: RootState) => state.cart.buyNowCart;
export const selectBuyNowCartId = (state: RootState) => state.cart.buyNowcartId;
export const selectUserOrders = (state: RootState) => state.cart.orders;
export const selectUserOrder = (state: RootState) => state.cart.order;
export const selectCartId = (state: RootState) => state.cart.cartId;
export const selectSuccess = (state: RootState) => state.cart.success;
export const selectMessage = (state: RootState) => state.cart.message;
export const selectGuestOrder = (state: RootState) => state.cart.guestOrder;
export const selectPromocode = (state: RootState) => state.cart.promoCode;
