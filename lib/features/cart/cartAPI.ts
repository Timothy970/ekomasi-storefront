import api from "@/lib/utils/axios";
import { AddToCartRequest, CreateCartRequest, CreateCartResponse, CreateOrderResponse, DeleteCartRequest, GuestOrderPayload, MemberOrderPayload, Order, OrderPayload, PaymentRequestPayload, PaymentRequestResponse, UserOrderResponse, UserOrdersResponse, ViewCartResponse } from "../types";
import axios, { AxiosError } from "axios";

export async function getCart(cart_id: string): Promise<ViewCartResponse> {
    try {
        const response = await axios.get<ViewCartResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/view/${cart_id}`,
            {
            }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError<ViewCartResponse>;
        return err.response?.data as ViewCartResponse;
    }
}

export async function addToCart(data: AddToCartRequest): Promise<any> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/add`,
            data,
            {
            }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.response?.data || err.message, "❌ error adding to cart");
        throw err;
    }
}

export async function createCart(data: CreateCartRequest): Promise<CreateCartResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}cart`,
            {
                // product_id: data?.product_id,
                // quantity: data?.quantity
            },
            {}
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function updateCart(data: CreateCartRequest): Promise<CreateCartResponse> {
    try {
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/update/${data?.cart_id}`,
            {
                product_id: data?.product_id,
                quantity: data?.quantity
            },
            {}
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function deleteProductFromCart(data: DeleteCartRequest): Promise<CreateCartResponse> {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/remove/${data?.cart_id}`,
            {
                data: { product_id: data?.product_id },
            }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function createMemberOrder(data: MemberOrderPayload): Promise<CreateOrderResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}order/create`,
            data,
            {}
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function makePayment(data: PaymentRequestPayload): Promise<PaymentRequestResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}payment/pay`,
            data,
            {}
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function createGuestOrder(data: GuestOrderPayload): Promise<CreateOrderResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}order/create`,
            data,
            {}
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getUserOrders(): Promise<UserOrdersResponse> {
    try {
        const response = await api.get<UserOrdersResponse>("order/list-orders", {
            headers: { requiresAuth: true },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getUserOrder(order_id: string): Promise<UserOrderResponse> {
    try {
        const response = await api.get<UserOrderResponse>(`order/view`, {
            params: { order_id },
            headers: { requiresAuth: true },
        });

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}