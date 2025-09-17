"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getFeaturedProductsAsync, selectFeatured } from "@/lib/features/navigation/navigationSlice";
import Link from "next/link";
import Image from "next/image";

export default function NowTrending({ title }: { title: string }) {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [cardW, setCardW] = useState(0);
    const GAP_PX = 16;
    const dispatch = useAppDispatch()
    const featured = useAppSelector(selectFeatured)

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
        dispatch(getFeaturedProductsAsync())
    }, []);

    const maxIndex = featured?.length ? Math.max(0, featured?.length - visibleCount) : 0;
    const canPrev = index > 0;
    const canNext = index < maxIndex;

    const next = () => setIndex((i) => (i < maxIndex ? i + 1 : i));
    const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));

    return (
        <div className="w-full flex justify-center items-center mt-[2rem] lg:mt-[2.5rem] pb-4">
            <div className="max-w-[90rem] w-full bg-white">
                <div className="flex items-end justify-between gap-4 mb-[2rem]">
                    <div>
                        <h2 className="text-2xl font-bold leading-[2.1rem]">{title}</h2>
                        <p className="pt-[0.5rem] text-custom-black/70 text-sm leading-[1.3125rem]">
                            Tap the arrows to slide products. One row. Animated with Framer Motion.
                        </p>
                    </div>
                </div>

                <div ref={containerRef} className="overflow-x-scroll scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <motion.div
                        className="flex flex-nowrap"
                        animate={{ x: -(index * (cardW + GAP_PX)) }}
                        transition={{ type: "spring", stiffness: 380, damping: 40 }}
                    >
                        {featured?.map((p, i) => (
                            <Link key={i.toString()} href={`/products/${p.product_id}`}>
                                <div
                                    ref={i === 0 ? cardRef : undefined}
                                    className="shrink-0 overflow-hidden mr-[1.5rem]"
                                >
                                    <div className="h-[13.5rem] sm:h-[20rem] md:h-[20rem] w-[13.5rem] sm:w-[20rem] md:w-[20rem] lg:w-[22rem] overflow-hidden relative">
                                        <Image
                                            alt={p.name}
                                            fill
                                            src={p.urls[0]?.url}
                                            className="rounded-md"
                                            unoptimized
                                            priority
                                            style={{ objectFit: "cover" }}

                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-[0.5rem] pt-[1rem]">
                                        <h3 className="text-[1rem] font-semibold leading-[1.5rem] truncate" title={p.name}>
                                            {p.name}
                                        </h3>
                                        <h3 className="text-xs font-medium leading-[1.5rem] truncate" title={p.name}>
                                            {p.name}
                                        </h3>
                                        <span className="text-sm font-bold text-[1.125rem]">KES {p.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {
                    canPrev || canNext && <div className="flex items-center justify-end gap-[1rem] mt-[1rem]">
                        <Button className="rounded-full border border-black" onClick={prev} variant="outline" size="icon" aria-label="Previous" disabled={!canPrev}>
                            <ChevronLeft className="h-[2rem] w-[3rem] " />
                        </Button>
                        <Button className="rounded-full border border-black" onClick={next} variant="outline" size="icon" aria-label="Next" disabled={!canNext}>
                            <ChevronRight className="h-[2rem] w-[3rem] rounded-full" />
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
}
