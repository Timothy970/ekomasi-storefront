import Link from "next/link";
import React from "react";
import { Category, SubCategory } from "@/lib/features/types";

type HeaderTopSliderProps = {
    hoveredCategoryId: string | null;
    handleMouseEnter: (id: string) => void;
    handleMouseLeave: () => void;
    subcategories: SubCategory[];
    hoveredCategory?: Category;
};

export default function HeaderTopSlider({
    hoveredCategoryId,
    handleMouseEnter,
    handleMouseLeave,
    subcategories,
    hoveredCategory,
}: HeaderTopSliderProps) {

    return (
        <div
            onMouseEnter={() => hoveredCategoryId && handleMouseEnter(hoveredCategoryId)}
            onMouseLeave={handleMouseLeave}
            className="w-full flex justify-center bg-white items-center absolute border-b top-[2.438rem] lg:px-[3rem] left-0 overflow-hidden transition-all duration-200 ease-in-out z-50"
            style={{ height: hoveredCategoryId ? "21rem" : "0" }}
        >
            <div className="max-w-[90rem] w-full grid grid-cols-3 gap-y-[0.69rem] gap-x-[2rem] h-full pt-[1rem]">
                {subcategories.map((sub) => (
                    <Link key={sub.id} href={`/subcategory/${sub.id}`}>
                        <span className="text-custom-black font-poppins text-[0.875rem] font-normal leading-[1.95rem] hover:underline">
                            {sub.name}
                        </span>
                    </Link>
                ))}

                {subcategories.length <= 0 && hoveredCategory && (
                    <div className="">
                        <Link href={`/category/${hoveredCategory.id}`}>
                            <span className="text-custom-black font-poppins text-[0.875rem] font-normal leading-[1.95rem] hover:underline">
                                Shop All
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
