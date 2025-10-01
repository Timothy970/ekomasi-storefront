import axios, { AxiosError } from "axios";
import { CreateCartResponse, DeleteCartRequest, WishlistsResponse } from "../types";

export async function addProductToWishList(token: string,product_id: string): Promise<any> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/product`,
            { product_id: product_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}


export async function getWishLists(token: string): Promise<WishlistsResponse | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
}

export async function deleteProductFromWishList(product_id:string): Promise<CreateCartResponse> {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/product/${product_id}`,
            {}
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}