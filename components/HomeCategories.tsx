"use client"
import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HomeCategories() {
  const categories = useAppSelector(selectCategories)

  return (
    <div className="w-full flex justify-center items-center relative z-0 pt-[6rem]">
      <div className="w-full absolute top-0 h-[14rem]">
        <div className="relative w-full">
          <svg
            viewBox="0 0 1440 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto absolute z-10"
          >
            <g filter="url(#filter0_d_9542_36387)">
              <path
                d="M1435.53 169.682L1434.61 169.573L1432.68 179.635L1432.49 179.611C1432.51 180.185 1432.46 180.76 1432.35 181.333C1430.58 190.548 1412.86 196.04 1392.76 193.599C1388.16 193.042 1383.84 192.115 1379.93 190.912C1361.73 195.868 1327.21 196.566 1288.5 191.866C1262.94 188.762 1240 183.843 1222.9 178.255C1210.85 189.082 1175.5 193.852 1135.48 188.993C1112.45 186.197 1092.09 180.721 1077.54 174.063C1060.33 180.862 1033.15 183.396 1003.58 179.806C984.619 177.504 967.539 173.028 954.065 167.328C941.104 185.51 902.963 195.588 860.724 190.459C850.466 189.213 840.775 187.166 831.901 184.492C810.51 206.117 765.147 217.781 715.82 211.791C661.314 205.172 619.508 179.13 612.282 149.973C608.011 151.112 603.675 152.187 599.281 153.191C518.25 171.699 448.254 159.288 442.94 125.469C442.332 121.6 442.6 117.618 443.668 113.572C432.422 114.149 420.126 113.739 407.389 112.193C375.586 108.331 349.069 98.3636 335.996 86.7362C316.545 90.1017 289.727 90.4276 260.715 86.9047C223.854 82.4288 192.702 72.8677 176.766 62.312C157.725 64.9566 132.513 64.947 105.362 61.6502C51.2626 55.081 9.39734 37.8925 9.86979 22.7643C0.757969 18.5901 -4.63792 12.7385 -3.53264 6.97738C-3.42262 6.4039 -3.2513 5.84456 -3.02091 5.30093L-3.2064 5.27859L-0.365697 -9.53116L3.88775 -9.01504L12.8399 -152.364L1450.04 -62.6106L1435.53 169.682ZM929.965 118.591C932.169 119.769 934.267 120.994 936.253 122.258C937.765 121.443 939.395 120.673 941.134 119.947L929.965 118.591ZM480.693 64.037C482.722 65.1924 484.613 66.38 486.358 67.5923C487.641 66.7896 488.948 65.9927 490.277 65.201L480.693 64.037ZM343.16 47.3366C345.498 48.3851 347.688 49.456 349.721 50.5418C351.55 49.9281 353.471 49.358 355.478 48.8318L343.16 47.3366Z"
                fill="#F6FEFE"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_9542_36387"
                x="-25.6753"
                y="-170.364"
                width="1497.72"
                height="409.719"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_9542_36387"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_9542_36387"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto absolute z-0"
          >
            <g filter="url(#filter0_d_9542_36386)">
              <path
                d="M1440 232.745L1439.07 232.694L1437.77 242.856L1437.58 242.845C1437.63 243.416 1437.62 243.993 1437.55 244.572C1436.36 253.879 1419.01 260.465 1398.8 259.282C1394.18 259.012 1389.81 258.357 1385.83 257.399C1367.97 263.481 1333.56 266.329 1294.63 264.051C1268.93 262.546 1245.73 259.066 1228.31 254.555C1216.96 266.111 1181.98 273.076 1141.74 270.721C1118.58 269.365 1097.92 265.169 1082.98 259.431C1066.23 267.289 1039.25 271.513 1009.52 269.772C990.45 268.656 973.125 265.254 959.321 260.405C947.518 279.36 910.08 291.795 867.604 289.309C857.287 288.705 847.488 287.265 838.464 285.149C818.463 308.066 773.915 322.534 724.311 319.631C669.498 316.422 626.15 293.036 617.121 264.387C612.929 265.79 608.669 267.133 604.346 268.408C524.626 291.931 453.992 283.907 446.581 250.485C445.733 246.661 445.752 242.67 446.565 238.565C435.377 239.842 423.08 240.2 410.272 239.45C378.29 237.578 351.203 229.283 337.431 218.493C318.227 223.064 291.482 225.061 262.307 223.354C225.239 221.184 193.551 213.583 176.988 204.041C158.149 207.867 132.985 209.429 105.682 207.831C51.2778 204.647 8.42259 190.101 7.95121 174.973C-1.40307 171.374 -7.15319 165.871 -6.40914 160.052C-6.33507 159.473 -6.19895 158.904 -6.00289 158.347L-6.18942 158.336L-4.27731 143.378L3.52859e-05 143.628V0H1440V232.745ZM932.231 213.265C934.503 214.303 936.673 215.395 938.734 216.533C940.192 215.625 941.771 214.755 943.462 213.922L932.231 213.265ZM480.432 186.819C482.528 187.846 484.49 188.913 486.307 190.015C487.537 189.134 488.792 188.257 490.069 187.384L480.432 186.819ZM342.125 178.724C344.523 179.624 346.776 180.557 348.873 181.514C350.66 180.787 352.542 180.098 354.512 179.448L342.125 178.724Z"
                fill="#F6FEFE"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_9542_36386"
                x="-28.4736"
                y="-18"
                width="1490.47"
                height="364"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_9542_36386"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_9542_36386"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-[90rem] w-full px-[1rem] lg:px-[3rem] z-10 bg-transparent">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-[1rem]">
            <h2 className="text-[2.25rem] not-italic font-bold leading-[2.1rem]">Categories</h2>
            <p className="text-custom-black font-poppins text-[1.125rem] font-normal leading-[1.3125rem] mt-[1rem]">
              Discover our pushchairs, baby clothing, nursery furniture and more
            </p>
          </div>

          <Button className="h-[3.438rem] hidden lg:flex min-w-[13rem] bg-transparent text-black justify-center items-center border rounded-full border-black">
            <span className="text-[1rem]">Browse by Category</span>
          </Button>
        </div>

        <div className="mt-[5rem] pb-[1rem]">
          <div className="grid grid-cols-2 gap-x-[0.5rem] gap-y-9 md:gap-x-6 lg:gap-x-[0.938rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
            {categories?.slice(0, 10)?.map((category) => (
              <Link key={category.id} href={`/category/${category?.id}`}>
                <div className="overflow-hidden flex flex-col justify-center items-center">
                  <div className="relative w-full h-auto min-h-[15.5rem] sm:min-h-[21rem] md:min-h-[21.875rem]">
                    <Image
                      src={category?.image_url}
                      alt={category?.name}
                      fill
                      unoptimized
                      style={{ objectFit: "cover" }}
                      className="product-card h-full w-full"
                      priority
                    />
                  </div>

                  <div className="px-2 pb-3 flex flex-col gap-[1rem] mt-[0.75rem] w-full justify-center lg:items-center">
                    <h3 className="text-[0.875rem] lg:text-base font-bold lg:font-light leading-[1.5rem]">{category.name}</h3>
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
