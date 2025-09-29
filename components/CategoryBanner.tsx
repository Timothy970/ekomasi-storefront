import React from "react";
import Image from "next/image";
import { customeParser } from "@/lib/utils";

export default function CategoryBanner({ imageUrl, description, title }: { imageUrl: string, description: string, title: string }) {
  return (
    <div className="relative w-full mx-auto overflow-hidden bg-black/40 h-[34.375rem] md:h-[30.125rem] z-0">
      {
        imageUrl && <Image
          src={imageUrl}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover z-0"
        />
      }

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center z-10 h-full">
        <div className="bg-black/40 lg:bg-transparent p-4 w-full h-full flex justify-center items-start flex-col max-w-[90rem]">
          <h2 className="text-white text-center font-roboto text-[2.5rem] font-bold leading-[3rem] lg:text-[3.5rem]">
            {title}
          </h2>
          <div className="text-white hidden md:block text-start font-poppins text-[1.25rem] font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-[1.5rem] lg:leading-[1.6875rem]">
            {customeParser(description)}
          </div>
        </div>
      </div>
    </div>
  );
}
