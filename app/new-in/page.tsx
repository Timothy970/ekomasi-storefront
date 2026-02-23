"use client";
import Navigation from '@/components/Navigation';
import { getSearchResultsAsync, selectPagination, selectSearchResults, selectStatus } from '@/lib/features/mall/mallSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import ProductListingLayout from '@/components/ProductListingLayout';
import { useFilterQuery } from '../ClientLayout';
import { Crumb } from '@/lib/features/types';

export default function NewIn() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const products = useAppSelector(selectSearchResults);
  const pagination = useAppSelector(selectPagination);
  const { query, setQuery } = useFilterQuery();
  const [breadCrumb, setBreadCrumb] = useState<Crumb[]>([]);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    setBreadCrumb([
      { link: '', name: "New In" }
    ]);
  }, []);

  useEffect(() => {
    const sp = searchParams.toString();
    if (sp !== query) {
      setQuery(sp);
    }
  }, [searchParams]);

  const addSalesTag = (q: string) => {
    const params = new URLSearchParams(q.startsWith("?") ? q.slice(1) : q);
    params.set("tag", "New In");
    return `?${params.toString()}`;
  };

  useEffect(() => {
    const formattedQuery = addSalesTag(query);
    dispatch(getSearchResultsAsync({ query: formattedQuery }));
  }, [query, dispatch]);

  const updateQueryParam = (param: string, value: string | number) => {
    const params = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
    params.set(param, value.toString());
    params.set("tag", "New In");
    return `?${params.toString()}`;
  };

  const handlePrev = () => {
    if (pagination?.has_prev) {
      const updatedQuery = updateQueryParam("page", pagination.page - 1);
      setQuery(updatedQuery);
    }
  };

  const handleNext = () => {
    if (pagination?.has_next) {
      const updatedQuery = updateQueryParam("page", pagination.page + 1);
      setQuery(updatedQuery);
    }
  };

  return (
    <Navigation>
      <ProductListingLayout
        listingDescription={""}
        listingName={"New In"}
        products={products ?? []}
        pagination={pagination}
        handlePrev={handlePrev}
        handleNext={handleNext}
        crumbs={breadCrumb}
        status={status}
      />
    </Navigation>
  );
}
