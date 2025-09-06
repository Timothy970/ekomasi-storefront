import { Button } from "@/components/ui/button";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    name: "Electronics",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    name: "Home & Living",
    image: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    image: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    name: "Beauty & Health",
    image: "https://picsum.photos/400/300?random=6",
  },
];

export default function HomeCategories() {
  return (
    <div className="w-full flex justify-center items-center mt-[2.5rem]">
      <div className="max-w-[90rem] w-full px-[1rem] lg:px-[4rem]">
        <div className="flex flex-col gap-y-[1rem]">
          <h2 className="text-2xl not-italic font-bold leading-[2.1rem]">Categories</h2>
          <p className="text-black font-poppins text-sm font-normal leading-[1.3125rem]">
            Discover our pushchairs, baby clothing, nursery furniture and more...
          </p>
        </div>

        <div className="mt-[2rem]">
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-6 lg:gap-x-[2rem] sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <div key={category.id} className="overflow-hidden flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg hover:shadow-xl transform transition duration-300 ease-in-out">
                <div className="relative w-full h-[13.5rem] sm:h-[20rem] md:h-[21.875rem]">
                  <Image
                    src={category?.image}
                    alt={category?.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-tl-lg rounded-tr-lg"
                    priority
                  />
                </div>
                
                <div className="p-4 flex flex-col gap-[1rem] mt-[0.75rem] w-full justify-center items-center">
                  <h2 className="text-base font-bold">Up to 40% off</h2>
                  <h3 className="text-base italic lg:font-light leading-[1.5rem]">{category.name}</h3>
                  <Button className="w-full hidden rounded-[2.5rem] md:block bg-[#AF52DE] h-[3rem] max-w-[18rem] font-semibold">Shop Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
