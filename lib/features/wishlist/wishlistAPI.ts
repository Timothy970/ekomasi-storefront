import axios, { AxiosError } from "axios";
import { CreateCartResponse, SharedWishListResponse, ShareWishListPayload, WishlistsResponse } from "../types";
import api from "@/lib/utils/axios";

export async function addProductToWishList(token: string, product_id: string): Promise<any> {
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

export async function deleteProductFromWishList(product_id: string): Promise<CreateCartResponse> {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/product/${product_id}`,
      {
        headers: {
          requiresAuth: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
}

export async function getSharedWishLists(wishlistID: string): Promise<SharedWishListResponse | null> {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/share/${wishlistID}`,
      {
        headers: {
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

export async function shareWishlist(payload: ShareWishListPayload): Promise<SharedWishListResponse | null> {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}wishlist/share`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          requiresAuth: true,
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
}