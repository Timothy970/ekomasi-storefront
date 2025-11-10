"use client";
import { Button } from "@/components/ui/button";
import type { Meta, Pagination } from "@/lib/features/types";

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
        className={`bg-white text-custom-black h-[3rem] min-w-[8rem] sm:min-w-[10rem] ${
          !meta.has_prev ? "border-gray-300" : "border-black"
        } border text-[0.875rem] font-normal leading-[195%]`}
        onClick={onPrev}
        disabled={!meta.has_prev}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-600 my-2 sm:my-0">
        Page {meta.page} of {meta.total_pages}
      </span>

      <Button
        variant="outline"
        className={`bg-white text-custom-black h-[3rem] min-w-[8rem] sm:min-w-[10rem] border ${
          !meta.has_next ? "border-gray-300" : "border-black"
        } text-[0.875rem] font-normal leading-[195%]`}
        onClick={onNext}
        disabled={!meta.has_next}
      >
        Next
      </Button>
    </div>
  );
}
