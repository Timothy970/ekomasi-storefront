"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
    { id: 1, name: "Men's Fashion", price: "KES 79", image: "https://picsum.photos/400/500?random=1" },
    { id: 2, name: "Women's Fashion", price: "KES 99", image: "https://picsum.photos/400/500?random=2" },
    { id: 3, name: "Electronics", price: "KES 299", image: "https://picsum.photos/400/500?random=3" },
    { id: 4, name: "Home & Living", price: "KES 159", image: "https://picsum.photos/400/500?random=4" },
    { id: 5, name: "Sports & Outdoors", price: "KES 129", image: "https://picsum.photos/400/500?random=5" },
    { id: 6, name: "Beauty & Health", price: "KES 49", image: "https://picsum.photos/400/500?random=6" },
    { id: 7, name: "Shoes", price: "KES 120", image: "https://picsum.photos/400/500?random=7" },
    { id: 8, name: "Furniture", price: "KES 399", image: "https://picsum.photos/400/500?random=8" },
    { id: 9, name: "Groceries", price: "KES 59", image: "https://picsum.photos/400/500?random=9" },
    { id: 10, name: "Toys", price: "KES 39", image: "https://picsum.photos/400/500?random=10" },
];

export default function ProductRowSlider() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [cardW, setCardW] = useState(0); 
    const GAP_PX = 16; 

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

    const maxIndex = Math.max(0, products.length - visibleCount);
    const canPrev = index > 0;
    const canNext = index < maxIndex;

    const next = () => setIndex((i) => (i < maxIndex ? i + 1 : i));
    const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));

    return (
        <div className="w-full flex justify-center items-center my-[2.5rem]">
            <div className="max-w-[90rem] w-full px-[1rem] lg:px-[4rem]">
                <div className="flex items-end justify-between gap-4 mb-[2rem]">
                    <div>
                        <h2 className="text-2xl font-bold leading-[2.1rem]">Now Trending</h2>
                        <p className="pt-[0.5rem] text-black/70 text-sm leading-[1.3125rem]">
                            Tap the arrows to slide products. One row. Animated with Framer Motion.
                        </p>
                    </div>
                </div>

                <div ref={containerRef} className="overflow-x-scroll scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <motion.div
                        className="flex flex-nowrap gap-x-[1.5rem]"
                        animate={{ x: -(index * (cardW + GAP_PX)) }}
                        transition={{ type: "spring", stiffness: 380, damping: 40 }}
                    >
                        {products.map((p, i) => (
                            <div
                                key={p.id}
                                ref={i === 0 ? cardRef : undefined}
                                className="shrink-0 overflow-hidden border border-gray-200 rounded-t-[0.5rem] hover:shadow-xl transform transition duration-300 ease-in-out"
                            >
                                <div className="h-[13.5rem] sm:h-[20rem] md:h-[20rem] w-[13.5rem] sm:w-[20rem] md:w-[20rem] lg:w-[22rem] overflow-hidden">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-[1rem] flex flex-col gap-y-[0.5rem]">
                                    <h3 className="text-[1rem] font-semibold leading-[1.5rem] truncate" title={p.name}>
                                        {p.name}
                                    </h3>
                                    <h3 className="text-xs font-medium leading-[1.5rem] truncate" title={p.name}>
                                        {p.name}
                                    </h3>
                                    <span className="text-sm font-bold text-[1.125rem]">{p.price}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex items-center justify-end gap-[1rem] mt-[1rem]">
                    <Button className="rounded-full border border-black" onClick={prev} variant="outline" size="icon" aria-label="Previous" disabled={!canPrev}>
                        <ChevronLeft className="h-[3rem] w-[3rem] " />
                    </Button>
                    <Button className="rounded-full border border-black" onClick={next} variant="outline" size="icon" aria-label="Next" disabled={!canNext}>
                        <ChevronRight className="h-[3rem] w-[3rem] rounded-full" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
