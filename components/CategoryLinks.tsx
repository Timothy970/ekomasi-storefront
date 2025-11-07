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
    const activeHoverRef = useRef<string | null>(null);

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
                dispatch(getSubCategoryAsync({ id: firstSubCategory?.id, page: 1, size: 2, query: '' }));
            }
        }
    }, [subcategories, hoveredCategoryId])
    const handleMouseEnter = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        activeHoverRef.current = id;

        timeoutRef.current = setTimeout(() => {
            if (activeHoverRef.current === id) {
                setHoveredCategoryId(id);
            }
        }, 300);
    };
    const handleMouseLeave = (id: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        activeHoverRef.current = null;

        timeoutRef.current = setTimeout(() => {
            if (!activeHoverRef.current) {
                setHoveredCategoryId(null);
            }
        }, 500);
    };

    return (
        <div className="w-full relative hidden lg:block">
            <div className="w-full lg:flex justify-center items-center flex-col h-auto bg-[rgba(148,35,117,0.08)] hidden overflow-x-scroll hide-scrollbar">
                <div className="max-w-[90rem] mx-auto">
                    <ul className="flex flex-row px-[1.5rem] py-[0.62rem] gap-x-[2rem] list-none text-custom-black font-sans text-[0.875rem] font-normal leading-[1.5rem] h-[2.438rem] overflow-x-scroll hide-scrollbar max-w-full">
                        <Link href={"/new-in"} className="flex w-auto text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem] text-nowrap">
                                New In
                            </span>
                        </Link>

                        <Link href={"/sales"} className="flex w-auto text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem] text-nowrap">
                                Sales
                            </span>
                        </Link>

                        {categories?.slice(0, 6).map((cat) => (
                            <li
                                key={cat.id}
                                onMouseEnter={() => handleMouseEnter(cat.id)}
                                onMouseLeave={() => handleMouseLeave(cat.id)}
                                className="flex w-auto  text-[0.875rem] justify-center items-center rounded cursor-pointer transition"
                            >
                                <span className="text-custom-black leading-[1.95rem] text-nowrap">
                                    {cat.name}
                                </span>
                            </li>
                        ))}

                        <Link href={"/blogs"} className="flex w-auto text-[0.875rem] justify-center items-center gap-[0.625rem] rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem] text-nowrap">
                                Blogs
                            </span>
                        </Link>

                        <Link href={"/about-us"} className="flex w-auto text-[0.875rem] justify-center items-center rounded cursor-pointer transition">
                            <span className="text-custom-black leading-[1.95rem] text-nowrap">
                                About Us
                            </span>
                        </Link>
                    </ul>
                </div>
            </div>

            <HeaderTopSlider
                handleMouseEnter={() => handleMouseEnter(hoveredCategoryId!)}
                handleMouseLeave={() => handleMouseLeave(hoveredCategoryId!)}
                hoveredCategoryId={hoveredCategoryId}
                subcategories={subcategories}
                hoveredCategory={hoveredCategory}
            />
        </div>
    );
}
