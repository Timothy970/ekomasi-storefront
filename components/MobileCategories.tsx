import React, { useEffect, useState } from "react";
import SideBarSubcategory from "./SideBarSubcategory";
import { useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { SubCategory } from "@/lib/features/types";

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
                {categories?.map((cat, index) => (
                    <li onClick={() => handleCategoryClick(cat?.id)} key={index} className="hover:text-gray-400 cursor-pointer">
                        <div className="flex justify-between items-center border-t border-black py-[0.5rem] h-[2.75rem]">
                            <span className="text-black font-poppins text-base font-medium leading-[1.5rem]">
                                {cat?.name}
                            </span>
                            {
                                cat?.subcategories && <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                            }
                        </div>
                    </li>
                ))}
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
