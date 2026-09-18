"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { customParser } from "@/lib/utils";

const slides = [
    {
        id: 1,
        title: "The Royal Elixir Collection",
        description: "Artisanal extrait de parfum bottled in hand-polished flacons with pure 24k gold accents.",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1600&auto=format&fit=crop",
        buttonText: "Explore Collection",
    },
    {
        id: 2,
        title: "Private Discovery Coffret",
        description: "Experience 5 iconic miniatures with a complimentary voucher redeemable against your first full-size flacon.",
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop",
        buttonText: "Discover Coffrets",
    },
    {
        id: 3,
        title: "Nocturne Rare Accords",
        description: "Deep smoky amber, dark velvet patchouli, and bourbon vanilla crafted for unforgettable evenings.",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1600&auto=format&fit=crop",
        buttonText: "Shop Nocturne",
    },
    {
        id: 4,
        title: "Bespoke Flacon Engraving",
        description: "Personalize your signature perfume flacon with custom gold calligraphy for the ultimate bespoke gift.",
        image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1600&auto=format&fit=crop",
        buttonText: "Personalize Flacon",
    },
];

export default function MothersDayBundle() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full mx-auto overflow-hidden">
            <div className="bg-black/40">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[current].id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[20.375rem] lg:max-h-[20rem]"
                    >
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center">
                            <div className="bg-black/40 lg:bg-transparent p-4 w-full h-full flex flex-col justify-center items-center">
                                <h2 className="text-white text-center font-roboto text-4xl font-bold leading-[3rem] lg:text-[3.5rem]">
                                    {slides[current].title}
                                </h2>
                                <div className="text-white text-center font-poppins text-[0.875rem] font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-lg lg:leading-[1.6875rem]">
                                    {customParser(slides[current].description)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-[1rem] hidden lg:flex lg:bottom-[3rem] w-full justify-center items-center space-x-[1.47rem] px-[1rem] lg:px-[3rem] h-[1.5rem]">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`rounded-full flex justify-center items-center ${current === index ? "bg-transparent border border-white w-[1rem] h-[1rem]" : "bg-white/60 w-[0.5rem] h-[0.5rem]"}`}
                    >
                        <span className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer ${current === index ? "bg-white" : "bg-white/60"}`}>

                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
