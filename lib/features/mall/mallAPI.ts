import { GetVariantsResponse, LocationsResponse, SuggestionsResponse } from "../types";
import axios, { AxiosError } from "axios";

export async function getVariants(): Promise<GetVariantsResponse> {
    try {
        const response = await axios.get<GetVariantsResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/variants`);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<GetVariantsResponse>;
        return err.response?.data as GetVariantsResponse;
    }
}

export async function getLocations(): Promise<LocationsResponse> {
    try {
        const response = await axios.get<LocationsResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}locations`);

        return response.data;
    } catch (error) {
        const err = error as AxiosError<LocationsResponse>;
        return err.response?.data as LocationsResponse;
    }
}

export async function getSearchAutocomplete(query: string): Promise<SuggestionsResponse> {
    try {
        const response = await axios.get<SuggestionsResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}autocomplete?q=${encodeURIComponent(query)}`
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError<SuggestionsResponse>;
        if (err.response?.data) {
            return err.response.data;
        }

        return {
            data: { suggestions: [] },
            status_code: 500,
            message: err.message || "Unexpected error",
        };
    }
}

