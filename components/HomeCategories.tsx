"use client"
import { selectCategories } from "@/lib/features/navigation/navigationSlice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeCategories() {
  const categories = useAppSelector(selectCategories)
  const router = useRouter()
  const [offsetX, setOffsetX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(208);
  const [viewportWidth, setViewportWidth] = useState(0);
  const animationRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const GAP_PX = 16;

  // Calculate card width and viewport width based on window size
  useEffect(() => {
    const getCardWidth = () => {
      if (typeof window === 'undefined') return 208;
      if (window.innerWidth < 640) return 128;
      if (window.innerWidth < 768) return 160;
      if (window.innerWidth < 1024) return 192;
      return 208;
    };

    const handleResize = () => {
      setCardWidth(getCardWidth());
      setViewportWidth(window.innerWidth);
    };

    // Set initial width
    setCardWidth(getCardWidth());
    setViewportWidth(typeof window !== 'undefined' ? window.innerWidth : 1440);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate how many cards fit on screen
  const cardsPerView = useMemo(() => {
    const maxContainerWidth = Math.min(viewportWidth * 0.9, 1440); // 90rem max
    return Math.floor(maxContainerWidth / (cardWidth + GAP_PX));
  }, [viewportWidth, cardWidth]);

  // Only enable auto-scroll if categories overflow the viewport
  const shouldAutoScroll = categories && categories.length > cardsPerView;

  // Duplicate categories for seamless loop (only if auto-scrolling)
  const duplicatedCategories = useMemo(() => {
    if (!categories?.length) return [];
    if (!shouldAutoScroll) return categories;
    // Duplicate the full category list twice for seamless infinite scroll
    return [...categories, ...categories];
  }, [categories, shouldAutoScroll]);

  const singleSetWidth = shouldAutoScroll ? categories.length * (cardWidth + GAP_PX) : 0;

  const prev = () => {
    if (!shouldAutoScroll) return;
    setIsPaused(true);
    setOffsetX((current) => {
      const newOffset = current - (cardWidth + GAP_PX);
      return newOffset < 0 ? singleSetWidth + newOffset : newOffset;
    });

    // Clear existing timer and set new one to resume after 3 seconds
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const next = () => {
    if (!shouldAutoScroll) return;
    setIsPaused(true);
    setOffsetX((current) => {
      const newOffset = current + (cardWidth + GAP_PX);
      return newOffset >= singleSetWidth ? newOffset - singleSetWidth : newOffset;
    });

    // Clear existing timer and set new one to resume after 3 seconds
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const canPrev = shouldAutoScroll;
  const canNext = shouldAutoScroll;

  useEffect(() => {
    if (!duplicatedCategories.length || isPaused || !shouldAutoScroll) return;

    const animate = () => {
      setOffsetX((prevOffset) => {
        const newOffset = prevOffset + 1.0; // Increased speed

        // Reset when we've scrolled through one complete set
        if (newOffset >= singleSetWidth) {
          return 0;
        }

        return newOffset;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duplicatedCategories.length, isPaused, singleSetWidth, shouldAutoScroll]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center relative z-0 pt-[6rem]">
      <div className="max-w-[90rem] w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-[1rem]">
            <h2 className="text-[2.25rem] not-italic font-bold leading-[2.1rem]">Categories</h2>
            <p className="text-custom-black font-poppins text-[1.125rem] font-normal leading-[1.3125rem] mt-[1rem]">
              Discover our pushchairs, baby clothing, nursery furniture and more
            </p>
          </div>

          <Button onClick={() => router.push("/categories")} className="h-[3.438rem] hidden lg:flex min-w-[13rem] bg-transparent text-black justify-center items-center border rounded-full border-black">
            <span className="text-[1rem]">View All</span>
          </Button>
        </div>

        <div className="mt-[5rem] pb-[1rem] relative">
          <div className="absolute -right-[1rem] z-50 pointer-events-none lg:-right-[2rem] top-2 w-full flex items-start justify-end h-[50%]">
            <svg className="mt-[4.18rem]" xmlns="http://www.w3.org/2000/svg" width="70" height="66" viewBox="0 0 70 66" fill="none">
              <path d="M14.6907 63.1617C15.086 63.1531 15.5705 63.1398 16.1344 63.1202C17.8463 63.0604 20.288 62.9399 23.193 62.6951C29.0152 62.2043 36.6452 61.2196 43.9772 59.2563C51.3559 57.2805 58.1932 54.3747 62.6427 50.1865C64.8427 48.1155 66.4261 45.7626 67.2387 43.0735C68.0495 40.3909 68.1321 37.2468 67.1389 33.5257C65.863 28.7454 63.4983 25.9801 60.7847 24.3812C58.0118 22.7475 54.6717 22.215 51.3096 22.3062C47.9577 22.397 44.7297 23.1037 42.315 23.8033C41.1141 24.1513 40.1296 24.4929 39.4504 24.7453C39.1113 24.8714 38.849 24.9748 38.6751 25.0453C38.5885 25.0804 38.5239 25.1074 38.4826 25.1248C38.462 25.1334 38.4464 25.1402 38.4377 25.1439C38.4339 25.1456 38.4313 25.1469 38.4301 25.1474L38.4292 25.1469L35.9484 26.227L35.6451 23.5395L35.6456 23.5387C35.6454 23.5373 35.645 23.5337 35.6444 23.529L35.6106 23.2749C35.5849 23.089 35.5443 22.81 35.4841 22.4531C35.3636 21.7386 35.1673 20.7151 34.8689 19.501C34.269 17.0598 33.2697 13.9109 31.6739 10.9627C30.0731 8.0054 27.942 5.37929 25.1402 3.79512C22.398 2.24473 18.8182 1.57933 14.0348 2.86603C10.7409 3.75208 8.36424 5.29291 6.65403 7.25934C4.93184 9.23964 3.79913 11.7529 3.16666 14.7C1.88968 20.6509 2.71223 28.0868 4.50348 35.5291C6.28385 42.9261 8.96615 50.1126 11.2152 55.4685C12.3377 58.1415 13.3479 60.3482 14.0757 61.8831C14.3128 62.3831 14.5196 62.8117 14.6907 63.1617Z" stroke="#ADD1CB" strokeWidth="4" />
            </svg>
            <svg className="mt-[8.49rem]" xmlns="http://www.w3.org/2000/svg" width="188" height="153" viewBox="0 0 188 153" fill="none">
              <path d="M93.7471 151.332C94.4767 150.899 95.5482 150.256 96.9102 149.418L97.4326 150.266C99.6335 148.912 102.591 147.054 106.091 144.752L105.542 143.918C108.092 142.24 110.932 140.326 113.979 138.202L114.55 139.022C117.18 137.189 119.963 135.197 122.849 133.066L122.257 132.264C124.884 130.324 127.596 128.267 130.353 126.104L130.969 126.89C133.59 124.834 136.251 122.683 138.919 120.447L138.277 119.68C140.841 117.531 143.412 115.305 145.956 113.009L146.624 113.751C149.138 111.482 151.629 109.147 154.067 106.752L154.068 106.752L153.368 106.038C155.79 103.659 158.157 101.223 160.443 98.738L161.178 99.4147C163.502 96.8889 165.742 94.3113 167.87 91.6921L167.097 91.0632C169.256 88.4055 171.296 85.7061 173.187 82.9753L174.007 83.5437C175.985 80.6858 177.803 77.7914 179.424 74.8698L178.551 74.3855C180.22 71.3757 181.676 68.3423 182.88 65.2985L183.809 65.6657C185.09 62.425 186.092 59.1659 186.77 55.9021L185.793 55.6989C186.481 52.3846 186.824 49.0733 186.777 45.779L187.776 45.7663C187.729 42.3915 187.28 39.0276 186.38 35.6892L185.416 35.948C184.582 32.8533 183.348 29.7773 181.669 26.7321L182.543 26.2507C180.992 23.4372 179.071 20.6538 176.748 17.9099L175.986 18.5544C175.189 17.6126 174.342 16.6754 173.445 15.7419L172.532 14.8093C171.393 13.6695 170.25 12.6166 169.108 11.6462L169.754 10.8864C167.17 8.69082 164.576 6.90434 161.985 5.47822L161.505 6.35029C158.639 4.77279 155.785 3.65214 152.96 2.91963L153.211 1.95479C150.05 1.13499 146.919 0.784869 143.843 0.82002L143.855 1.81807C140.75 1.85352 137.696 2.29111 134.721 3.0417L134.476 2.07393C131.407 2.8482 128.428 3.94494 125.568 5.26631L125.988 6.17256C123.144 7.48684 120.415 9.02999 117.832 10.7019L117.288 9.86396C114.561 11.629 112 13.5319 109.641 15.4577L110.272 16.2311C107.685 18.3427 105.341 20.4832 103.287 22.4968L102.588 21.7849C99.9016 24.418 97.7088 26.8322 96.1143 28.6872L96.8721 29.3376C95.9178 30.4478 95.1808 31.3543 94.6836 31.9811C94.435 32.2945 94.2468 32.5387 94.1211 32.7028C94.0583 32.7849 94.0105 32.8472 93.9795 32.8884C93.9641 32.9088 93.9527 32.9244 93.9453 32.9343C93.9417 32.9391 93.9392 32.9428 93.9375 32.945C93.9368 32.946 93.9359 32.9465 93.9356 32.947L93.9356 32.9479L93.1309 34.0329L92.3281 32.947L92.3272 32.947C92.3268 32.9465 92.327 32.9452 92.3262 32.944C92.3245 32.9418 92.3211 32.9383 92.3174 32.9333C92.31 32.9233 92.2986 32.9078 92.2832 32.8874C92.2522 32.8462 92.2053 32.7839 92.1426 32.7019C92.017 32.5376 91.8285 32.2938 91.5801 31.9802C91.0832 31.3528 90.3464 30.4458 89.3926 29.3347L90.1504 28.6843C88.5566 26.8277 86.3651 24.4112 83.6797 21.7761L82.9815 22.488C80.9278 20.4728 78.5837 18.3306 75.9971 16.2175L76.6289 15.444C74.2697 13.5167 71.7088 11.6126 68.9815 9.84638L68.4385 10.6843C65.8552 9.01135 63.1257 7.46767 60.2813 6.15302L60.7002 5.24677C57.8406 3.9251 54.861 2.82896 51.791 2.05536L51.5479 3.02314C48.5718 2.27318 45.517 1.83621 42.4111 1.80243L42.4209 0.804386C39.345 0.77105 36.2141 1.123 33.0527 1.94501L33.3047 2.90985C30.4803 3.64419 27.6256 4.767 24.7598 6.34638L24.2774 5.47431C21.6872 6.90186 19.0922 8.68878 16.5078 10.8854L17.1553 11.6452C16.0131 12.616 14.8715 13.6693 13.7315 14.8093L13.2822 15.2643C12.2438 16.328 11.2815 17.4033 10.3926 18.489L9.61915 17.8561C7.38302 20.5873 5.59391 23.3918 4.21193 26.2556L5.11232 26.6891C3.65679 29.7051 2.66554 32.786 2.08888 35.9157L1.10646 35.735C0.501656 39.0176 0.33987 42.3525 0.568369 45.7204L1.56544 45.653C1.78155 48.838 2.35513 52.0616 3.2422 55.3073L2.27833 55.571C3.13652 58.711 4.28031 61.8626 5.66895 65.0104L6.58399 64.6071C7.88187 67.5491 9.39794 70.4926 11.0986 73.4245L10.2354 73.9255C11.8804 76.7614 13.6936 79.5823 15.6445 82.3766L16.4629 81.8054C18.3348 84.4865 20.3356 87.1455 22.4375 89.7712L21.6592 90.3952C23.7333 92.9862 25.9021 95.5447 28.1426 98.0583L28.8887 97.3923C31.0982 99.8712 33.377 102.309 35.6992 104.695L34.9834 105.391C37.3262 107.799 39.7113 110.154 42.1143 112.446L42.8047 111.722C45.2452 114.05 47.7043 116.313 50.1533 118.503L49.4863 119.248C52.0351 121.526 54.5742 123.722 57.0703 125.828L57.7139 125.065C60.3487 127.288 62.9372 129.408 65.4424 131.411L64.8193 132.19C67.5686 134.389 70.2163 136.449 72.7168 138.349L73.3223 137.553C76.2295 139.763 78.9357 141.759 81.3643 143.513L80.7783 144.324C84.1181 146.736 86.9358 148.691 89.0322 150.118L89.5938 149.293C90.893 150.177 91.914 150.858 92.6094 151.317C92.8239 151.459 93.008 151.579 93.1592 151.677C93.3198 151.583 93.5167 151.468 93.7471 151.332Z" stroke="#A5CECA" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
          </div>

          <div
            className="overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              className="flex flex-nowrap gap-[0.5rem]"
              style={{
                transform: `translateX(-${offsetX}px)`,
                transition: 'none'
              }}
            >
              {duplicatedCategories?.map((category, i) => (
                <Link key={`${category.id}-${i}`} href={`/category/${category?.id}`}>
                  <div
                    className="shrink-0 overflow-hidden bg-white w-[8rem] sm:w-[10rem] md:w-[12rem] lg:w-[13rem]"
                  >
                    <div className="relative w-full h-[10rem] sm:h-[12rem] md:h-[13rem] lg:h-[14rem]">
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
                      <h3 className="text-[0.75rem] lg:text-sm font-bold lg:font-light leading-[1.2rem]">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {shouldAutoScroll && (
            <div className="flex items-center justify-end gap-[1rem] mt-[1rem]">
              <Button
                className="rounded-full border border-black"
                onClick={prev}
                variant="outline"
                size="icon"
                aria-label="Previous"
                disabled={!canPrev}
              >
                <ChevronLeft className="h-[2.5rem] w-[3rem]" />
              </Button>
              <Button
                className="rounded-full border border-black"
                onClick={next}
                variant="outline"
                size="icon"
                aria-label="Next"
                disabled={!canNext}
              >
                <ChevronRight className="h-[2.5rem] w-[3rem] rounded-full" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
