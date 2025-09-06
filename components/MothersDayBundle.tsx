"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Mother’s Day Bundle",
        description: "Celebrate the moms in your life with 15% savings on our specially curated bundle",
        image: "https://picsum.photos/1200/400?random=1",
        buttonText: "Learn More",
    },
    {
        id: 2,
        title: "Discover New Deals",
        description: "Get the best offers curated just for you.",
        image: "https://picsum.photos/1200/400?random=1",
        buttonText: "Learn More",
    },
    {
        id: 3,
        title: "Shop the Latest Trends",
        description: "Stay ahead with fresh arrivals every week.",
        image: "https://picsum.photos/1200/400?random=2",
        buttonText: "Learn More",
    },
    {
        id: 4,
        title: "Exclusive Discounts",
        description: "Enjoy up to 50% off on selected items.",
        image: "https://picsum.photos/1200/400?random=3",
        buttonText: "Learn More",
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

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full max-w-[90rem] mx-auto overflow-hidden mt-[2rem] lg:mt-[5rem] bg-black/40">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[20.375rem] lg:max-h-[20rem]"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center">
                        <div className="bg-black/40 lg:bg-transparent p-4 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-white text-center font-roboto text-4xl font-bold leading-[3rem] lg:text-[3.5rem]">
                                {slides[current].title}
                            </h2>
                            <p className="text-white text-center font-poppins text-base font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-lg lg:leading-[1.6875rem]">
                                {slides[current].description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-[1rem] hidden lg:flex lg:bottom-[4rem] w-full justify-center items-center space-x-[1.47rem] px-[1rem] lg:px-[4rem] h-[1.5rem]">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`rounded-full flex justify-center items-center ${current === index ? "bg-transparent border w-[1rem] h-[1rem]" : "bg-[#F5F5F596] w-[0.5rem] h-[0.5rem]"}`}
                    >
                        <span className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer ${current === index ? "bg-white" : "bg-[#F5F5F596]"}`}>

                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
