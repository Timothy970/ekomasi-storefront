"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { customParser } from "@/lib/utils";
import { HomeBannerInfo } from "@/lib/features/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getBannersAsync, selectBanners } from "@/lib/features/navigation/navigationSlice";

export default function HomeBanner() {
    const [current, setCurrent] = useState(0);
    const router = useRouter()
    const [slides, setSlides] = useState<HomeBannerInfo[]>([]);
    const apiBanners = useAppSelector(selectBanners) as HomeBannerInfo[] | null;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBannersAsync());
    }, [dispatch]);


    const banners: HomeBannerInfo[] = [
        {
            id: 1,
            heading: "A Scent That Tells Your Story",
            text: "Immerse your senses in artisanal fragrances crafted with rare botanicals, noble woods, and precious amber.",
            image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2080&auto=format&fit=crop",
            button_text: "Explore Fragrances",
            button_url: "/search",
        },
        {
            id: 2,
            heading: "The Art of Haute Parfumerie",
            text: "From timeless French accords to enchanting oriental blends, discover your bespoke signature scent.",
            image_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop",
            button_text: "Discover Signature Scents",
            button_url: "/search",
        },
        {
            id: 3,
            heading: "Private Reserve & Bespoke Blends",
            text: "Handcrafted in limited editions for the discerning connoisseur of elegance, prestige, and allure.",
            image_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1974&auto=format&fit=crop",
            button_text: "Shop Private Reserve",
            button_url: "/search",
        },
    ];

    useEffect(() => {
        if (apiBanners && apiBanners.length > 0) {
            setSlides(apiBanners);
        } else {
            setSlides(banners);
        }
    }, [apiBanners]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (slides && slides.length > 0) {
                setCurrent((prev) => (prev + 1) % slides.length);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    const prevSlide = () => {
        if (slides && slides.length > 0) {
            setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }
    };

    const nextSlide = () => {
        if (slides && slides.length > 0) {
            setCurrent((prev) => (prev + 1) % slides.length);
        }
    };

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full mx-auto overflow-hidden bg-black/40">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[34.375rem] md:h-[30.125rem] lg:h-[34.75rem]"
                >
                    <Image
                        src={slides[current].image_url}
                        alt={slides[current].heading}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 lg:bg-black/40 flex flex-col justify-center items-center text-center">
                        <div className="bg-black/40 lg:bg-transparent p-4 w-[80%] lg:max-w-[55rem]">
                            <h2 className="text-white text-center font-roboto text-[2rem] lg:text-[3.5rem] font-bold leading-[3rem] lg:leading-[4.2rem]">
                                {slides[current].heading}
                            </h2>
                            <div className="text-white text-center font-poppins text-[1.125rem] font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-[1.5rem] lg:leading-[1.6875rem]">
                                {customParser(slides[current].text)}
                            </div>
                        </div>

                        <Button onClick={() => router.push(slides[current].button_url)} className="h-[2.75rem] px-6 rounded-full bg-primary-tenant hover:opacity-90 text-primary-foreground mt-[1.5rem] lg:mt-[2rem] shadow-lg font-semibold tracking-wide">
                            <span className="flex items-center justify-center gap-x-[0.75rem] text-[0.875rem] uppercase">
                                {slides[current].button_text}
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 12" fill="none">
                                    <path d="M1.70697 11.4496L7.41397 5.74264L1.70697 0.0356445L0.292969 1.44964L4.58597 5.74264L0.292969 10.0356L1.70697 11.4496Z" fill="currentColor" />
                                </svg>
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute w-full right-0 left-0 bottom-[3rem] lg:bottom-[5.5rem]">
                <div className="max-w-[90rem] mx-auto relative">
                    <div className="absolute right-[3rem] flex justify-between items-center">
                        <button
                            onClick={prevSlide}
                            className="hidden lg:block p-1 hover:opacity-80 transition-opacity"
                            aria-label="Previous slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M16.5645 2.78223C24.1462 2.78223 30.3145 8.95048 30.3145 16.5322C30.3145 24.114 24.1462 30.2822 16.5645 30.2822C8.98275 30.2822 2.8145 24.114 2.8145 16.5322C2.8145 8.95048 8.98275 2.78223 16.5645 2.78223ZM16.5645 27.5322C22.6296 27.5322 27.5645 22.5974 27.5645 16.5322C27.5645 10.4671 22.6296 5.53223 16.5645 5.53223C10.4994 5.53223 5.5645 10.4671 5.5645 16.5322C5.5645 22.5974 10.4994 27.5322 16.5645 27.5322Z" fill="white" fillOpacity="0.82" />
                                <path d="M20.2866 10.6294L14.3837 16.5323L20.2866 22.4351L18.3423 24.3794L10.4952 16.5323L18.3423 8.68514L20.2866 10.6294Z" fill="white" fillOpacity="0.82" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="hidden lg:block p-1 hover:opacity-80 transition-opacity"
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                <path d="M14.5645 0.782227C6.98275 0.782227 0.814499 6.95048 0.814499 14.5322C0.814499 22.114 6.98275 28.2822 14.5645 28.2822C22.1462 28.2822 28.3145 22.114 28.3145 14.5322C28.3145 6.95048 22.1462 0.782227 14.5645 0.782227ZM14.5645 25.5322C8.49937 25.5322 3.5645 20.5974 3.5645 14.5322C3.5645 8.4671 8.49937 3.53223 14.5645 3.53223C20.6296 3.53223 25.5645 8.4671 25.5645 14.5322C25.5645 20.5974 20.6296 25.5322 14.5645 25.5322Z" fill="white" />
                                <path d="M10.8424 8.62939L16.7453 14.5323L10.8424 20.4351L12.7867 22.3794L20.6338 14.5323L12.7867 6.68514L10.8424 8.62939Z" fill="white" />
                            </svg>
                        </button>
                    </div>

                    <div className="absolute w-[10rem] lg:w-[25rem] flex justify-start items-center space-x-[1.47rem] px-[1rem] lg:px-[3rem] h-[1.5rem]">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id ?? index}
                                onClick={() => setCurrent(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`rounded-full flex justify-center items-center ${current === index ? "bg-transparent border border-white w-[1rem] h-[1rem]" : "bg-white/60 w-[0.5rem] h-[0.5rem]"}`}
                            >
                                <span className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer bg-white/80`}></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
