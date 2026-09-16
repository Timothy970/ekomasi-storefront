				redirectToOrderDetails: (
					cart_id: string,
					data: MemberOrderPayload,
					page: string,
					delivery_id: string,
					fail?: boolean,
					message?: string,
					skipPayment?: boolean
				) => void,
				extraPaymentPayload: { phone: string },
				triggerToast: (message: string, type: ToastType) => void,
			}) => {
				const response = await createOrder(data, page);

				if (response?.status_code !== 201 && response?.message) {
					triggerToast(response?.message, "error");
				}

				const orderId = response?.data?.order_id;
				if (!orderId) {
					return response;
				}

				const deliveryId = response?.data?.delivery_id;
				const total = response?.data?.total;

				if (total <= 0) {
					redirectToOrderDetails(orderId, data, page, deliveryId, false, "", true);
					return response;
				}

				const paymentData = {
					phone_number: extraPaymentPayload?.phone,
					order_id: orderId,
				};

				const paymentRes = await makePayment(paymentData);
				const errorMessage = paymentRes?.data?.errorMessage;

				if (paymentRes?.message && !errorMessage) {
					redirectToOrderDetails(orderId, data, page, deliveryId, false, "");
				} else if (errorMessage) {
					redirectToOrderDetails(orderId, data, page, deliveryId, false, errorMessage);
				} else {
					redirectToOrderDetails(orderId, data, page, deliveryId, true, "Order successfully placed!");
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 201 && action.payload.data.order_id) {
						state.success = true;
						// state.cart = null
						// state.buyNowCart = null
						// state.cartId = null
						// state.buyNowcartId = null
						// state.promoCode = null
					} else {
						state.message = action.payload?.message || "Failed to fetch variants";
						state.success = false;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		clearCartState: create.reducer((state) => {
			state.cart = null;
			state.buyNowCart = null;
			state.cartId = null;
			state.buyNowcartId = null;
			state.promoCode = null;
		}),
		deleteProductFromCartAsync: create.asyncThunk(
			async ({ product_id, refetchCart, cart_id }: { product_id: string, refetchCart: (cart_id: string) => void, cart_id: string }) => {
				const response = await deleteProductFromCart({ product_id, cart_id });

				if (cart_id) {
					refetchCart(cart_id)
				}

				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data.cart_id) {
						state.success = true;
					} else {
						state.message = action.payload?.message || "Failed to fetch variants";
						state.success = false;
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		getOrdersAsync: create.asyncThunk(
			async () => {
				const response = await getUserOrders();
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.orders = action.payload.data?.orders
					} else {
						state.message = action.payload?.message || "Failed to fetch cart";
						state.success = false;
						state.orders = []
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		getOrderAsync: create.asyncThunk(
			async (order_id: string) => {
				const response = await getUserOrder(order_id);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200 && action.payload.data) {
						state.success = true;
						state.order = action.payload.data
					} else {
						state.message = action.payload?.message || "Failed to fetch cart";
						state.success = false;
						state.orders = []
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
		getGuestOrderAsync: create.asyncThunk(
			async (data: GuestOrderParams) => {
				const response = await getGuestOrder(data);
				return response;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					if (action.payload?.status_code === 200) {
						state.success = true;
						state.guestOrder = action.payload.data
					} else {
						state.message = action.payload?.message || "Failed to fetch guest order";
						state.success = false;
						state.guestOrder = null
					}
					state.status = "idle";
				},
				rejected: (state, action) => {
					state.status = "failed";
					state.message = action.error?.message || "Something went wrong";
					state.success = false;
				},
			}
		),
	}),
	selectors: {
		selectStatus: (state: CartSliceState) => state.status,
		selectCart: (state: CartSliceState) => state.cart,
		selectBuyNowCart: (state: CartSliceState) => state.buyNowCart,
		selectBuyNowCartId: (state: CartSliceState) => state.buyNowcartId,
		selectUserOrders: (state: CartSliceState) => state.orders,
		selectUserOrder: (state: CartSliceState) => state.order,
		selectCartId: (state: CartSliceState) => state.cartId,
		selectSuccess: (state: CartSliceState) => state.success,
		selectMessage: (state: CartSliceState) => state.message,
		selectGuestOrder: (state: CartSliceState) => state.guestOrder,
		selectPromocode: (state: CartSliceState) => state.promoCode,
	},
});

// Export actions and selectors
export const { resetSuccess, resetMessage, setPromocode, getCartAsync, getBuyNowCartAsync, addToCartAsync, applyPromoCodeDiscountAsync, createCartAsync, addToBuyNowCartAsync, createBuyNowCartAsync, updateCartAsync, deleteProductFromCartAsync, createOrderAsync, getOrdersAsync, getOrderAsync, getGuestOrderAsync, clearCartState } = cartSlice.actions; // Export actions
export const { selectStatus, selectSuccess, selectMessage, selectBuyNowCart, selectPromocode, selectBuyNowCartId, selectCart, selectCartId, selectUserOrders, selectUserOrder, selectGuestOrder } = cartSlice.selectors;
export const cartReducer = cartSlice.reducer;