import React from "react";
import Image from "next/image";

export default function SubCategoryBanner({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative w-full max-w-[90rem] mx-auto overflow-hidden bg-black/40 h-[34.375rem] md:h-[30.125rem] z-0">
      {
        imageUrl && <Image
          src={imageUrl}
          alt="category banner"
          fill
          priority
          className="object-cover z-0"
        />
      }

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center z-10">
        <div className="bg-black/40 lg:bg-transparent p-4 w-full h-full flex justify-center items-start flex-col">
          <h2 className="text-white text-start font-roboto text-4xl font-bold leading-[3rem] lg:text-[3.5rem]">
            Short heading here
          </h2>
          <p className="text-white text-start font-poppins text-base font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-lg lg:leading-[1.6875rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
        </div>
      </div>
    </div>
  );
}
