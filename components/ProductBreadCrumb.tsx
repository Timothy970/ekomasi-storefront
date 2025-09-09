"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductBreadCrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <nav className="text-sm text-gray-600 my-4 px-[1rem] lg:px-[4rem]">
            <ol className="flex flex-wrap items-center space-x-2">
                <li>
                    <Link href="/" className="hover:underline text-black font-roboto text-base not-italic font-semibold leading-[150%] underline-offset-auto decoration-solid">
                        Home
                    </Link>
                </li>

                {segments.map((segment, idx) => {
                    const href = "/" + segments.slice(0, idx + 1).join("/");
                    const isLast = idx === segments.length - 1;

                    return (
                        <li key={href} className="flex items-center space-x-2">
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
                            {isLast ? (
                                <span className="capitalize text-black font-roboto text-base not-italic font-semibold leading-[150%] decoration-solid">
                                    {segment}
                                </span>
                            ) : (
                                <Link href={href} className="capitalize text-black font-roboto text-base not-italic font-semibold leading-[150%] decoration-solid">
                                    {segment}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
