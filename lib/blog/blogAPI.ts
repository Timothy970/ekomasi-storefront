import api from "@/lib/utils/axios";
import { AxiosError } from "axios";
import { GetBlogResponse, GetBlogsResponse } from "../features/types";

export async function getBlogs(query: string): Promise<GetBlogsResponse | null> {
    try {
        const response = await api.get<GetBlogsResponse>(`blogs?${query}`, { headers: { requiresAuth: false } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}

export async function getBlog(blog_id: string): Promise<GetBlogResponse> {
    try {
        const response = await api.get<GetBlogResponse>(`blogs/${blog_id}`, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw err;
    }
}