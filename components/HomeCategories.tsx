"use client"
import { Button } from "@/components/ui/button";
import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategories() {
  const categories = useAppSelector(selectCategories)

  return (
    <div className="w-full flex justify-center items-center mt-[2.5rem]">
      <div className="max-w-[90rem] w-full px-[1rem] lg:px-[3rem]">
        <div className="flex flex-col gap-y-[1rem]">
          <h2 className="text-2xl not-italic font-bold leading-[2.1rem]">Categories</h2>
          <p className="text-[#031026] font-poppins text-sm font-normal leading-[1.3125rem]">
            Discover our pushchairs, baby clothing, nursery furniture and more
          </p>
        </div>

        <div className="mt-[2rem] pb-[1rem]">
          <div className="grid grid-cols-2 gap-x-[0.5rem] gap-y-9 md:gap-x-6 lg:gap-x-[2rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
            {categories?.map((category) => (
              <Link key={category.id} href={`/category/${category?.id}`}>
                <div className="overflow-hidden flex flex-col justify-center items-center">
                  <div className="relative w-full h-auto min-h-[15.5rem] sm:min-h-[21rem] md:min-h-[21.875rem] rounded-none ">
                    <Image
                      src={category?.image_url}
                      alt={category?.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-none lg:rounded-tl-lg lg:rounded-tr-lg h-full w-full"
                      priority
                    />
                  </div>

                  <div className="px-2 pb-3 flex flex-col gap-[1rem] mt-[0.75rem] w-full justify-center lg:items-center">
                    <h3 className="text-[0.875rem] font-bold lg:font-light leading-[1.5rem]">{category.name}</h3>
                    <Button className="w-full hidden rounded-[2.5rem] lg:flex items-center justify-center bg-[#AF52DE] h-[2rem] max-w-[18rem] text-center font-semibold text-[0.875rem]">Shop Now</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
