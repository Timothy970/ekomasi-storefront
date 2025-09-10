import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { Category, SubCategory } from "@/lib/features/types";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export default function CategorySlider() {
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<SubCategory[] | []>([]);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const categories = useAppSelector(selectCategories)
    const [hoveredCategory, setHoveredCategory] = useState<Category>()

    useEffect(() => {
        if (hoveredCategoryId) {
            const category = categories?.find((c) => c.id === hoveredCategoryId);

            if (category) setHoveredCategory(category)

            if (category && category?.subcategories) {
                setSubcategories(category.subcategories);
            } else {
                setSubcategories([]);
            }
        } else {
            setSubcategories([]);
        }
    }, [hoveredCategoryId]);

    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredCategoryId(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setHoveredCategoryId(null), 500);
    };

    return (
        <div className="w-full relative hidden lg:block">
            <div className="w-full lg:flex justify-center items-center flex-col h-[4rem] bg-[rgba(148,35,117,0.08)] hidden">
                <div className="max-w-[90rem] mx-auto">
                    <ul className="flex flex-row list-none p-0 text-black font-sans text-base font-normal leading-[1.5rem] gap-2">
                        {categories?.map((cat) => (
                            <li
                                key={cat.id}
                                onMouseEnter={() => handleMouseEnter(cat.id)}
                                onMouseLeave={handleMouseLeave}
                                className="flex w-auto h-[3.1875rem] hover:font-semibold p-[0.625rem] text-base justify-center items-center gap-[0.625rem] rounded cursor-pointer transition"
                            >
                                <span className="text-black font-poppins text-base font-normal leading-[1.95rem]">{cat.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div
                onMouseEnter={() => hoveredCategoryId && handleMouseEnter(hoveredCategoryId)}
                onMouseLeave={handleMouseLeave}
                className={`w-full flex justify-center bg-white items-center absolute top-[4rem] lg:px-[4rem] left-0 overflow-hidden transition-all duration-200 ease-in-out z-50`}
                style={{ height: hoveredCategoryId ? "24rem" : "0" }}
            >
                <div className="max-w-[90rem] w-full grid grid-cols-3 gap-y-[0.69rem] gap-x-[2rem] h-full pt-[1rem]">
                    {subcategories.map((sub) => (
                        <Link key={sub.id} href={`/subcategory/${sub?.id}`}>
                            <span className="text-black font-poppins text-base font-normal leading-[1.95rem] hover:underline">{sub.name}</span>
                        </Link>
                    ))}

                    {
                        subcategories?.length <= 0 && hoveredCategory && <div>
                            <Link href={`/category/${hoveredCategory?.id}`}>
                                <span className="text-black font-poppins text-base font-normal leading-[1.95rem] hover:underline">Shop All</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
