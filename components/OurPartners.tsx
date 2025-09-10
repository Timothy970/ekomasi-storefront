"use client";
import React, { useMemo } from "react";
import Image from "next/image";

const baseBrands = [
    "/images/brands/brand1.png",
    "/images/brands/brand2.png",
    "/images/brands/brand3.png",
    "/images/brands/brand4.png",
    "/images/brands/brand5.png",
    "/images/brands/brand6.png",
    "/images/brands/brand7.png",
    "/images/brands/brand8.png",
    "/images/brands/brand9.png",
];

export default function Brands() {
    const brands = useMemo(() => {
        const multiplied: string[] = [];
        for (let i = 0; i < 10; i++) {
            multiplied.push(...baseBrands);
        }
        return multiplied;
    }, []);

    return (
        <div className="mt-8 overflow-hidden relative w-full max-w-[90rem] mx-auto py-[3rem] flex items-center flex-col justify-center">
            <div className="flex w-full max-w-[90rem] bg-white">
                <div className="flex items-start justify-between gap-4 mb-8 w-full px-[1rem] lg:px-[4rem]">
                    <div className='w-full'>
                        <h2 className="text-[#222] font-comfortaa text-[1.5rem] lg:text-[2.25rem] font-bold leading-[2.7rem]">
                            Our Partners
                        </h2>
                    </div>
                </div>
            </div>

            <div className="marquee mt-[1rem] px-[1rem]">
                {brands.concat(brands).map((src, i) => (
                    <div key={i} className="inline-block px-8 lg:px-[2rem]">
                        <div className="relative w-32 h-16">
                            <Image
                                src={src}
                                alt={`Brand ${i + 1}`}
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>
                {`
                    .marquee {
                        display: inline-block;
                        white-space: nowrap;
                        animation: marquee 250s linear infinite;
                    }
                    .marquee:hover {
                        animation-play-state: paused;
                    }
                    @keyframes marquee {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                `}
            </style>
        </div>
    );
}
