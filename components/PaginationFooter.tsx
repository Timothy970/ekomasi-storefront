"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "@/lib/features/types";

interface PaginationFooterProps {
    pagination: Pagination | null;
    onPrev: () => void;
    onNext: () => void;
    colSpan: number;
}

export default function PaginationFooter({
    pagination,
    onPrev,
    onNext,
    colSpan
}: PaginationFooterProps) {
    if (!pagination) {
        return (
            <tfoot className="bg-white w-full border-b-0 rounded-[1.25rem]">
                <tr>
                    <td colSpan={colSpan} className="p-2">
                        <div className="flex justify-center items-center w-full py-2 text-gray-400 text-sm">
                            Loading...
                        </div>
                    </td>
                </tr>
            </tfoot>
        );
    }

    const start = (pagination.page - 1) * pagination.size + 1;
    const end = Math.min(pagination.page * pagination.size, pagination.total_items);

    return (
        <tfoot className="bg-white w-full border-b-0 rounded-[1.25rem]">
            <tr>
                <td colSpan={colSpan} className="p-2">
                    <div className="flex justify-between items-center w-full">
                        <span></span>

                        <div className="flex items-center gap-x-[1rem]">
                            <span className="text-[0.875rem]">
                                Rows per page: {pagination.size}
                            </span>

                            <span className="text-[0.875rem] font-[400]">
                                {start} - {end} of {pagination.total_items}
                            </span>

                            <button
                                disabled={!pagination.has_prev}
                                onClick={onPrev}
                                className={`p-1 bg-white ${pagination.has_prev ? "text-black" : "text-gray-400"
                                    }`}
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                disabled={!pagination.has_next}
                                onClick={onNext}
                                className={`p-1 bg-white ${pagination.has_next ? "text-black" : "text-gray-400"
                                    }`}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
}
