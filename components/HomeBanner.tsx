"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const slides = [
    {
        id: 1,
        title: "Discover New Deals",
        description: "Get the best offers curated just for you.",
        image: "https://picsum.photos/1200/400?random=1",
        buttonText: "Learn More",
    },
    {
        id: 2,
        title: "Shop the Latest Trends",
        description: "Stay ahead with fresh arrivals every week.",
        image: "https://picsum.photos/1200/400?random=2",
        buttonText: "Learn More",
    },
    {
        id: 3,
        title: "Exclusive Discounts",
        description: "Enjoy up to 50% off on selected items.",
        image: "https://picsum.photos/1200/400?random=3",
        buttonText: "Learn More",
    },
];

export default function HomeBanner() {
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
        <div className="relative w-full max-w-[90rem] mx-auto overflow-hidden bg-black/40">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[34.375rem] md:h-[30.125rem]"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 lg:bg-black/40 flex flex-col justify-center items-center text-center">
                        <div className="bg-black/40 lg:bg-transparent p-4 w-[80%]">
                            <h2 className="text-white text-center font-roboto text-4xl font-bold leading-[3rem] lg:text-[3.5rem]">
                                {slides[current].title}
                            </h2>
                            <p className="text-white text-center font-poppins text-base font-normal leading-[1.95rem] mt-[2.5rem] lg:mt-[1.5rem] lg:text-lg lg:leading-[1.6875rem]">
                                {slides[current].description}
                            </p>
                        </div>

                        <Button className="h-[3.4rem] rounded-[1.5rem] bg-black lg:bg-[#AF52DE] mt-[1.5rem]">
                            <span className="px-[1.5rem] flex items-center justify-center gap-x-[0.5rem] text-white font-poppins text-base font-normal leading-[1.95rem]">
                                {slides[current].buttonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                                    <path d="M1.70697 11.4496L7.41397 5.74264L1.70697 0.0356445L0.292969 1.44964L4.58597 5.74264L0.292969 10.0356L1.70697 11.4496Z" fill="white" />
                                </svg>
                            </span>

                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute right-[4rem] bottom-[4rem] flex justify-between items-center">
                <button
                    onClick={prevSlide}
                    className="hidden lg:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M16.5645 2.78223C24.1462 2.78223 30.3145 8.95048 30.3145 16.5322C30.3145 24.114 24.1462 30.2822 16.5645 30.2822C8.98275 30.2822 2.8145 24.114 2.8145 16.5322C2.8145 8.95048 8.98275 2.78223 16.5645 2.78223ZM16.5645 27.5322C22.6296 27.5322 27.5645 22.5974 27.5645 16.5322C27.5645 10.4671 22.6296 5.53223 16.5645 5.53223C10.4994 5.53223 5.5645 10.4671 5.5645 16.5322C5.5645 22.5974 10.4994 27.5322 16.5645 27.5322Z" fill="white" fillOpacity="0.82" />
                        <path d="M20.2866 10.6294L14.3837 16.5323L20.2866 22.4351L18.3423 24.3794L10.4952 16.5323L18.3423 8.68514L20.2866 10.6294Z" fill="white" fillOpacity="0.82" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="hidden lg:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                        <path d="M14.5645 0.782227C6.98275 0.782227 0.814499 6.95048 0.814499 14.5322C0.814499 22.114 6.98275 28.2822 14.5645 28.2822C22.1462 28.2822 28.3145 22.114 28.3145 14.5322C28.3145 6.95048 22.1462 0.782227 14.5645 0.782227ZM14.5645 25.5322C8.49937 25.5322 3.5645 20.5974 3.5645 14.5322C3.5645 8.4671 8.49937 3.53223 14.5645 3.53223C20.6296 3.53223 25.5645 8.4671 25.5645 14.5322C25.5645 20.5974 20.6296 25.5322 14.5645 25.5322Z" fill="white" />
                        <path d="M10.8424 8.62939L16.7453 14.5323L10.8424 20.4351L12.7867 22.3794L20.6338 14.5323L12.7867 6.68514L10.8424 8.62939Z" fill="white" />
                    </svg>
                </button>
            </div>


            <div className="absolute bottom-[1rem] lg:bottom-[4rem] w-[10rem] lg:w-[25rem] flex justify-start items-center space-x-[1.47rem] px-[1rem] lg:px-[4rem] h-[1.5rem]">
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
