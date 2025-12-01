"use client";
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ReviewsList from './ReviewsList'
import { useFilterQuery } from '@/app/ClientLayout'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getProductReviewsAsync } from '@/lib/features/navigation/navigationSlice'
import { useAppDispatch } from '@/lib/hooks'

export default function CustomerReviews() {
    const { query, setQuery } = useFilterQuery();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const params = useParams<{ product_id: string }>();

    const updateQueryParam = (param: string, value: string | number) => {
        const sp = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
        sp.set(param, value.toString());
        return `?${sp.toString()}`;
    };

    const handleRatingChange = (value: string) => {
        const newQuery = updateQueryParam("rating", value);
        setQuery(newQuery);
    };

    const handleSortChange = (value: string) => {
        const newQuery = updateQueryParam("sort", value);
        setQuery(newQuery);
    };

    useEffect(() => {
        if (!query) return;

        const formattedQuery = query.startsWith("?") ? query : `?${query}`;
        dispatch(getProductReviewsAsync(params?.product_id));

        router.replace(`${pathname}${formattedQuery}`, { scroll: false });
    }, [query, dispatch, pathname, router, params?.product_id]);

    return (
        <div className='mt-[2rem]'>
            <div className='flex flex-row justify-between gap-x-[1rem]'>
                <Select onValueChange={handleRatingChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ratings" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Ratings</SelectLabel>
                            {[5, 4, 3, 2, 1].map((n) => (
                                <SelectItem key={n} value={n.toString()}>
                                    {n} Stars
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="highest">Highest Rating</SelectItem>
                            <SelectItem value="lowest">Lowest Rating</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-[2rem]'>
                <ReviewsList />
            </div>
        </div>
    );
}
