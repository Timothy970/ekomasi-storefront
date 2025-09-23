import { getSubCategoryAsync, selectCategories } from "@/lib/features/navigation/navigationSlice";
import { Category, SubCategory } from "@/lib/features/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState, useRef, useEffect } from "react";
import HeaderTopSlider from "./HeaderTopSlider";
import Link from "next/link";

export default function CategorySlider() {
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const categories = useAppSelector(selectCategories);
    const [hoveredCategory, setHoveredCategory] = useState<Category | undefined>();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (hoveredCategoryId) {
            const category = categories?.find((c) => c.id === hoveredCategoryId);

            if (category) setHoveredCategory(category);

            if (category?.subcategories) {
                setSubcategories(category.subcategories);
            } else {
                setSubcategories([]);
            }
        } else {
            setSubcategories([]);
        }
    }, [hoveredCategoryId, categories]);

    useEffect(() => {
        if (subcategories?.length > 0 && hoveredCategoryId) {
            const firstSubCategory = subcategories[0]

            if (firstSubCategory?.id) {
                dispatch(getSubCategoryAsync({ id: firstSubCategory?.id, page: 1, size: 2 }));
            }
        }
    }, [subcategories, hoveredCategoryId])

    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredCategoryId(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setHoveredCategoryId(null), 500);
    };

    return (
        <div className="w-full relative hidden lg:block">
            <div className="w-full lg:flex justify-center items-center flex-col h-auto bg-[rgba(148,35,117,0.08)] hidden">
                <div className="max-w-[90rem] mx-auto">
                    <ul className="flex flex-row list-none p-0 text-custom-black font-sans text-[0.875rem] font-normal leading-[1.5rem] gap-2 h-[2.438rem] overflow-x-scroll max-w-full">
                        <Link href={"/new-in"} className="flex w-auto xl:min-w-[7.3rem] px-[0.625rem] text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem]">
                                New In
                            </span>
                        </Link>
                        
                        <Link href={"/sales"} className="flex w-auto xl:min-w-[7.3rem] px-[0.625rem] text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem]">
                                Sales
                            </span>
                        </Link>

                        {categories?.map((cat) => (
                            <li
                                key={cat.id}
                                onMouseEnter={() => handleMouseEnter(cat.id)}
                                onMouseLeave={handleMouseLeave}
                                className="flex w-auto xl:min-w-[7.3rem] px-[0.625rem] text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition"
                            >
                                <span className="text-custom-black leading-[1.95rem]">
                                    {cat.name}
                                </span>
                            </li>
                        ))}

                        <Link href={"/blogs"} className="flex w-auto xl:min-w-[7.3rem] px-[0.625rem] text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem]">
                                Blogs
                            </span>
                        </Link>

                        <Link href={"/about-us"} className="flex w-auto xl:min-w-[7.3rem] px-[0.625rem] text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem]">
                                About Us
                            </span>
                        </Link>
                    </ul>
                </div>
            </div>

            <HeaderTopSlider
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                hoveredCategoryId={hoveredCategoryId}
                subcategories={subcategories}
                hoveredCategory={hoveredCategory}
            />
        </div>
    );
}
