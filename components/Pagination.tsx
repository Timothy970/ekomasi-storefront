"use client";

import { Button } from "@/components/ui/button";
import type { Meta, Pagination } from "@/lib/features/types";


interface PaginationProps {
  meta: Meta | Pagination;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ meta, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex w-full justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        className="bg-white text-custom-black h-[2rem] min-w-[10rem] border border-black text-[0.875rem] font-normal leading-[195%]"
        onClick={onPrev}
        disabled={!meta.has_prev}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {meta.page} of {meta.total_pages}
      </span>

      <Button
        variant="outline"
        className="bg-white text-custom-black h-[2rem] min-w-[10rem] border border-black text-[0.875rem] font-normal leading-[195%]"
        onClick={onNext}
        disabled={!meta.has_next}
      >
        Next
      </Button>
    </div>
  );
}
