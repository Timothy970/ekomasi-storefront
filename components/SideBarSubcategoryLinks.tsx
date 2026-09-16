import { SubCategory } from '@/lib/features/types';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

interface SideBarProps {
    openInnerSideBar: boolean;
    setOpenInnerSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    subcategories: SubCategory[];
    subCategoryTitle: string;
}

export default function SideBarSubcategory({ openInnerSideBar, setOpenInnerSideBar, subcategories, subCategoryTitle }: Readonly<SideBarProps>) {
    return (
        <div className={`h-screen w-screen absolute px-[1.25rem] pb-[2.5rem]  top-0 left-0 z-50 border border-gray-300 bg-white transform transition-transform duration-500 ease-in-out ${openInnerSideBar ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-start items-center mt-[1rem] w-full gap-[0.38rem]">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenInnerSideBar(false)}
                    className="p-0 h-auto hover:bg-transparent"
                    aria-label="Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[1.5rem] h-[1.5rem] lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </Button>

                <h2 className='text-custom-black text-center font-poppins text-sm font-semibold leading-[1.3125rem]'>{subCategoryTitle}</h2>
            </div>

            <div className="mt-[1.5rem] max-h-[70%] overflow-y-hidden shadow-xl border border-slate-50 rounded-md">
                <div className="max-h-[60%] w-full bg-white  px-[0.75rem] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <ul className="mt-[1.25rem] p-y-[0.81rem]">
                        {subcategories.map((sub, index) => (
                            <li
                                key={sub?.id || index}
                                className="hover:text-gray-400 cursor-pointer"
                            >
                                <Link href={`/subcategory/${sub.id}`} onClick={() => setOpenInnerSideBar(false)}>
                                    <div className="flex justify-between items-center py-[0.5rem] h-[2.75rem]">
                                        <h3 className="text-custom-black font-poppins text-[0.875rem] leading-[1.5rem] capitalize">
                                            {sub?.name}
                                        </h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
