import React, { useEffect, useState } from "react";
import SideBarSubcategory from "./SideBarSubcategoryLinks";
import { useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { SubCategory } from "@/lib/features/types";
import Link from "next/link";

export default function MobileCategories() {
    const [openInnerSideBar, setOpenInnerSideBar] = useState(false)
    const categories = useAppSelector(selectCategories)
    const [clickedCategoryId, setClickedCategoryId] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<SubCategory[] | []>([]);
    const [subCategoryTitle, setSubCategoryTitle] = useState("")

    useEffect(() => {
        if (clickedCategoryId) {
            const category = categories?.find((c) => c.id === clickedCategoryId);

            if (category && category?.subcategories) {
                setSubcategories(category.subcategories);
                setSubCategoryTitle(category.name)
            } else {
                setSubcategories([]);
                setSubCategoryTitle("")
            }
        } else {
            setSubcategories([]);
            setSubCategoryTitle("")
        }
    }, [clickedCategoryId]);

    const handleCategoryClick = (id: string) => {
        setOpenInnerSideBar(true)
        setClickedCategoryId(id);
    };

    return (
        <div className="h-full w-full">
            <ul className="mt-[1.25rem] space-y-4 h-full w-full">
                <Link href={"/new-in"} className="flex justify-between items-center border-t border-[#AAA] py-[0.5rem] w-full h-[2.75rem]">
                    <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem]">
                        New In
                    </span>
                </Link>

                <Link href={"/sales"} className="flex justify-between items-center border-t border-[#AAA] py-[0.5rem] w-full h-[2.75rem]">
                    <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem]">
                        Sales
                    </span>
                </Link>

                {categories?.map((cat, index) => (
                    <li key={index} className="w-full">
                        <div className="flex justify-between items-center border-t border-[#AAA] py-[0.5rem] w-full h-[2.75rem]">
                            {
                                cat?.subcategories ? <div onClick={() => handleCategoryClick(cat?.id)} className="flex justify-between items-center w-full h-full">
                                    <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem]">{cat?.name}</span>
                                    <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                    </div>
                                </div> : <Link href={`/category/${cat?.id}`} className="w-full">
                                    <div className="h-[2.75rem] w-full flex justify-center items-center">
                                        <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem] mt-[1rem] w-full h-full">
                                            {cat?.name}
                                        </span>
                                    </div>
                                </Link>
                            }
                        </div>
                    </li>
                ))}

                <Link href={"/blogs"} className="flex justify-between items-center border-t border-[#AAA] py-[0.5rem] w-full h-[2.75rem]">
                    <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem]">
                        Blogs
                    </span>
                </Link>

                <Link href={"/about-us"} className="flex justify-between items-center border-t border-[#AAA] py-[0.5rem] w-full h-[2.75rem]">
                    <span className="text-custom-black font-poppins text-[0.875rem] font-medium leading-[1.5rem]">
                        About Us
                    </span>
                </Link>
            </ul>

            <SideBarSubcategory
                setOpenInnerSideBar={setOpenInnerSideBar}
                openInnerSideBar={openInnerSideBar}
                subcategories={subcategories}
                subCategoryTitle={subCategoryTitle}
            />
        </div>
    );
}
