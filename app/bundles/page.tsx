"use client";
import Navigation from '@/components/Navigation';
import { selectStatus } from '@/lib/features/mall/mallSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout';
import { useFilterQuery } from '../ClientLayout';
import { Crumb, Product } from '@/lib/features/types';
import { getProductBundlesAsync, selectPagination, selectProductBundles } from '@/lib/features/navigation/navigationSlice';

export default function Bundles() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const productBundles = useAppSelector(selectProductBundles);
    const { query, setQuery } = useFilterQuery();
    const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([]);
    const status = useAppSelector(selectStatus);
    const pagination = useAppSelector(selectPagination)
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        dispatch(getProductBundlesAsync({ query: "" }));
    }, [dispatch]);

    useEffect(() => {
        setBreadCrumb([
            { link: '', name: "Bundles" }
        ]);
    }, []);

    useEffect(() => {
        setItems(productBundles?.bundles as Product[] ?? []);
    }, [productBundles]);

    useEffect(() => {
        const sp = searchParams.toString();
        if (sp !== query) {
            setQuery(sp);
        }
    }, [searchParams]);


    const updateQueryParam = (param: string, value: string | number) => {
        const params = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
        params.set(param, value.toString());
        return `?${params.toString()}`;
    };

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const updatedQuery = updateQueryParam("page", pagination.page - 1);
            setQuery(updatedQuery);
            dispatch(getProductBundlesAsync({ query: updatedQuery }));
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            const updatedQuery = updateQueryParam("page", pagination.page + 1);
            setQuery(updatedQuery);
            dispatch(getProductBundlesAsync({ query: updatedQuery }));
        }
    };

    return (
        <Navigation>
            <ProductListingLayout
                listingDescription={""}
                listingName={"Bundles"}
                products={items}
                pagination={pagination}
                handlePrev={handlePrev}
                handleNext={handleNext}
                crumbs={breadCrumb}
                status={status}
            />
        </Navigation>
    );
}
