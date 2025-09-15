import { AddToCartRequest, CreateCartRequest, CreateCartResponse, DeleteCartRequest, ViewCartResponse } from "../types";
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

        console.log(response.data, "✅ added to cart");
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
