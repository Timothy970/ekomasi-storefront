"use client";
import { selectProduct } from "@/lib/features/navigation/navigationSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductBreadCrumb() {
    const product = useAppSelector(selectProduct)
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <div className="text-sm text-gray-600 my-4 px-[1rem] lg:px-[4rem]">
            <div className="flex flex-wrap items-center space-x-[0.3rem]">
                <Link href="/" className="underline text-black font-roboto text-base font-semibold">
                    Home
                </Link>

                <span className="text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right-icon lucide-chevron-right"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>

                <div className="capitalize text-black font-roboto text-base font-semibold">
                    {product?.name}
                </div>
            </div>
        </div>
    );
}
