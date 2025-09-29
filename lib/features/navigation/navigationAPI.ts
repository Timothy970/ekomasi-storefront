import { CategoriesResponse, Category, CategoryResponse, FeaturedProductsResponse, HomeDataResponse, ProductResponse, SubcategoryProductsResponse } from "../types";
import axios, { AxiosError } from "axios";

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await axios.get<CategoriesResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/categories-products`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<CategoriesResponse>;
    return err.response?.data as CategoriesResponse;
  }
}


export async function getCategoryById(id: string, query:string): Promise<CategoryResponse | null> {
  try {
    const response = await axios.get<CategoryResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/categories-products/${id}?${query}`);
    console.log(response, 'ressssss')

    return response.data;
  } catch (error) {
    const err = error as AxiosError<CategoryResponse>;
    if (err.response) {
      return err.response?.data;
    }

    return null
  }
}

export async function getSubCategoryById(
  id: string,
  page: number = 1,
  size: number = 10,
  query: string
): Promise<SubcategoryProductsResponse | null> {
  try {
    const response = await axios.get<SubcategoryProductsResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/subcategories/${id}?${query}`,
      { params: { page, size } }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<SubcategoryProductsResponse>;
    if (err.response) {
      return err.response.data;
    }

    return null;
  }
}

export async function getFeaturedProducts(): Promise<FeaturedProductsResponse | null> {
  try {
    const response = await axios.get<FeaturedProductsResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/featured`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<FeaturedProductsResponse>;
    if (err.response) {
      return err.response.data;
    }

    return null;
  }
}

export async function getProduct(product_id: string): Promise<ProductResponse | null> {
  try {
    const response = await axios.get<ProductResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/${product_id}`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ProductResponse>;
    if (err.response) {
      return err.response.data;
    }

    return null;
  }
}

export async function getHomeDate(): Promise<HomeDataResponse> {
  try {
    const response = await axios.get<HomeDataResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}home/data`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<HomeDataResponse>;
    return err.response?.data as HomeDataResponse;
  }
}
