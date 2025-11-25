"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getFeaturedProductsAsync,
  selectFeatured,
} from "@/lib/features/navigation/navigationSlice";
import Link from "next/link";
import Image from "next/image";
import { customParser } from "@/lib/utils";

export default function NowTrending({ title }: { title: string }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState(0);
  const GAP_PX = 16;
  const dispatch = useAppDispatch();
  const featured = useAppSelector(selectFeatured);

  useLayoutEffect(() => {
    const update = () => {
      if (cardRef.current) setCardW(cardRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleCount = useMemo(() => {
    const wrapW = containerRef.current?.offsetWidth ?? 0;
    if (!wrapW || !cardW) return 1;
    const count = Math.max(1, Math.floor((wrapW + GAP_PX) / (cardW + GAP_PX)));
    return count;
  }, [cardW]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (cardRef.current) setCardW(cardRef.current.offsetWidth);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    dispatch(getFeaturedProductsAsync());
  }, [dispatch]);

  const maxIndex = featured?.length
    ? Math.max(0, featured.length - visibleCount)
    : 0;

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const next = () =>
    setIndex((i) => Math.min(i + visibleCount, maxIndex));
  const prev = () =>
    setIndex((i) => Math.max(i - visibleCount, 0));

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex]);

  return (
    <div className="w-full flex justify-center items-start mt-[2rem] lg:mt-[2.5rem] lg:mb-[2.5rem] pb-4">
      <div className="max-w-[90rem] w-full">
        <div className="flex items-end justify-between gap-4 mb-[2rem]">
          <div>
            <h2 className="text-2xl lg:text-[2.25rem] font-bold leading-[2.1rem]">
              {title}
            </h2>
          </div>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-auto scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <motion.div
            className="flex flex-nowrap gap-[0.5rem]"
            animate={{ x: -(index * (cardW + GAP_PX)) }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
          >
            {featured?.map((p, i) => (
              <Link key={i.toString()} href={`/products/${p.product_id}`}>
                <div
                  ref={i === 0 ? cardRef : undefined}
                  className="shrink-0 overflow-hidden bg-white w-[10rem] sm:w-[13rem] md:w-[16rem] mr-[1rem]"
                >
                  <div className="h-[13.5rem] sm:h-[14rem] md:h-[15rem] lg:h-[16rem] overflow-hidden relative">
                    <Image
                      alt={"trending"}
                      fill
                      src={p.urls[0]?.url}
                      className="product-card rounded-t-md"
                      unoptimized
                      priority
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="pt-4 ">
                    <h3 className="text-[0.875rem] lg:text-base font-bold lg:font-light leading-[1.5rem]">
                      {p.category_name}
                    </h3>

                    <div className="text-custom-black font-[600] text-[0.875rem] lg:text-base leading-[1.3rem] mt-1 line-clamp-2 capitalize text-wrap">
                      {customParser(p.name)}
                    </div>

                    <p className="mt-2 text-[1.25rem] font-bold text-custom-black">
                      {"KES " +
                        new Intl.NumberFormat("en-KE", {
                          minimumFractionDigits: 0,
                        }).format(p.price ?? 0)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {(canPrev || canNext) && (
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
  );
}
