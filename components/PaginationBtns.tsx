"use client";
import { Button } from "@/components/ui/button";
import type { Meta, Pagination } from "@/lib/features/types";
import { scrollToTop } from "@/lib/utils";

interface PaginationProps {
  meta: Meta | Pagination;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationBtns({ meta, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4 mt-[2rem] md:mt-[2.5rem]">
      <Button
        variant="outline"
        className={`bg-white text-custom-black cursor-pointer h-[2.5rem] min-w-[8rem] sm:min-w-[10rem] ${!meta.has_prev ? "border-gray-300" : "border-black"} border text-[0.875rem] font-normal leading-[195%]`}
        disabled={!meta.has_prev}
        onClick={() => {
          onPrev()
          scrollToTop()
        }}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-600 my-2 sm:my-0">
        Page {meta.page} of {meta.total_pages}
      </span>

      <Button
        variant="outline"
        className={`bg-white text-custom-black cursor-pointer h-[2.5rem] min-w-[8rem] sm:min-w-[10rem] border ${!meta.has_next ? "border-gray-300" : "border-black"} text-[0.875rem] font-normal leading-[195%]`}
        onClick={() => {
          onNext()
          scrollToTop()
        }}
        disabled={!meta.has_next}
      >
        Next
      </Button>
    </div>
  );
}
