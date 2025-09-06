import { CategoryResponse, HomeDataResponse } from "../types";
import axios, { AxiosError } from "axios";

export async function getCategories(): Promise<CategoryResponse> {
  try {
    const response = await axios.get<CategoryResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/categories`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<CategoryResponse>;
    return err.response?.data as CategoryResponse;
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
