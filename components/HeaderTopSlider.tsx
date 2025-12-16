import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Category, SubCategory } from "@/lib/features/types";
import TopSliderProducts from "./TopSliderProducts";
import { useAppSelector } from "@/lib/hooks";
import { selectSubCategory } from "@/lib/features/navigation/navigationSlice";

type HeaderTopSliderProps = {
    hoveredCategoryId: string | null;
    handleMouseEnter: (id: string) => void;
    handleMouseLeave: () => void;
    subcategories: SubCategory[];
    hoveredCategory?: Category;
    categoryPosition: { left: number; width: number };
};

export default function HeaderTopSlider({
    hoveredCategoryId,
    handleMouseEnter,
    handleMouseLeave,
    subcategories,
    hoveredCategory,
    categoryPosition,
}: HeaderTopSliderProps) {
    const subCategory = useAppSelector(selectSubCategory)
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const sliderWidth = 640;

    useEffect(() => {
        if (hoveredCategoryId) {
            const screenWidth = window.innerWidth;
            const categoryCenter = categoryPosition.left + (categoryPosition.width / 2);

            let calculatedLeft = categoryCenter - (sliderWidth / 2);

            if (calculatedLeft < 24) {
                calculatedLeft = 24;
            }

            if (calculatedLeft + sliderWidth > screenWidth - 24) {
                calculatedLeft = screenWidth - sliderWidth - 24;
            }

            setSliderPosition(calculatedLeft);
        }
    }, [hoveredCategoryId, categoryPosition]);

    return (
        <div
            onMouseEnter={() => hoveredCategoryId && handleMouseEnter(hoveredCategoryId)}
            onMouseLeave={handleMouseLeave}
            className="bg-white items-start absolute border-b top-[2.438rem] overflow-hidden transition-all duration-200 ease-in-out z-50 shadow-lg"
            style={{
                height: hoveredCategoryId ? "20rem" : "0",
                left: `${sliderPosition}px`,
                width: "40rem",
                maxWidth: "calc(100vw - 3rem)"
            }}
        >
            <div className="w-full h-full flex justify-between pt-[1rem] px-[1.5rem]">
                <div className="w-[27rem] flex flex-wrap content-start gap-y-[0.69rem]">
                    {subcategories.map((sub) => (
                        <Link key={sub.id} href={`/subcategory/${sub.id}`} className="w-1/1">
                            <span className="text-custom-black font-poppins text-[0.875rem] font-normal leading-[1.95rem] hover:underline">
                                {sub.name}
                            </span>
                        </Link>
                    ))}

                    {subcategories.length <= 0 && hoveredCategory && (
                        <div className="w-1/1">
                            <Link href={`/category/${hoveredCategory.id}`}>
                                <span className="text-custom-black font-poppins text-[0.875rem] font-normal leading-[1.95rem] hover:underline">
                                    Shop All
                                </span>
                            </Link>
                        </div>
                    )}
                </div>

                {subCategory?.products && hoveredCategoryId && (
                    <div className="flex-1 pl-6">
                        <TopSliderProducts />
                    </div>
                )}
            </div>
        </div>
    );
}
