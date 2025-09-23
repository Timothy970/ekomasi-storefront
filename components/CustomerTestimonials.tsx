"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Star from "./Star";

const slides = [
    {
        id: 1,
        testimony:
            "“My daughter-in-law is pretty particular (in a good way!), so I was nervous about buying baby gifts. The Adenzo customer service team helped me pick the perfect items for my new grandson. She was thrilled and said 'Finally, someone who gets what new parents actually need!' Made this grandma very happy”",
        name: "Linda K",
        stars: 5,
    },
    {
        id: 2,
        testimony: "“Excellent customer service helped me choose gifts. Really satisfied!”",
        name: "John D",
        stars: 4,
    },
    {
        id: 3,
        testimony: "“Quick delivery and quality products. Highly recommend Adenzo!”",
        name: "Sarah M",
        stars: 5,
    },
];

export default function CustomerTestimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i < slides.length - 1 ? i + 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center items-center py-12">
            <div className="w-full max-w-[90rem] px-[1rem] lg:px-[3rem]">
                <div className="flex items-end justify-between gap-4 mb-8 ">
                    <div>
                        <h2 className="text-2xl lg:text-[2.25rem] font-bold leading-[2.1rem]">
                            Customer Testimonials
                        </h2>
                        <p className="mt-[1rem] text-custom-black/70 text-sm lg:text-[1.125rem] leading-[1.3125rem]">
                            Tap the arrows to slide testimonials. Animated with Framer Motion.
                        </p>
                    </div>
                </div>

                <div className="relative h-[25rem] md:h-[20rem] lg:h-[29rem] flex items-center justify-center overflow-hidden">
                    <svg
                        className="absolute w-full h-full top-0 left-0 z-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 333 533"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0.5 71.1788L332.5 0V410.819L0.5 533V71.1788Z"
                            fill="#F0F0E5"
                        />
                    </svg>

                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={slides[index].id}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full z-10 text-start px-6 flex flex-col items-start"
                        >
                            <div className="flex justify-start gap-[0.5rem] lg:hidden">
                                {Array.from({ length: slides[index].stars }).map((_, i) => (
                                    <Star key={i} size={24} color="#AF52DE" />
                                ))}
                            </div>

                            <div className="relative z-10 flex justify-start items-center">
                                <svg className="lg:absolute hidden lg:block left-0 top-0" xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                    <path d="M31.3464 22.9588L32.4914 22.9186C45.0326 22.5972 40.8522 -5.20323 27.4323 2.14859C17.5272 7.57206 19.3644 32.5201 29.9619 36.6178C34.6482 38.4256 39.867 37.14 35.9795 35.1314C32.6512 33.444 29.9619 28.5832 30.1482 24.606C30.2015 23.7221 30.7074 22.9588 31.3464 22.9588Z" fill="black" />
                                    <path d="M6.87609 1.14419C-5.18581 8.13445 -0.286512 38.6667 13.1067 39.9924C16.5948 40.354 17.5002 39.1086 14.8641 37.6222C12.3079 36.1759 9.08611 29.3463 8.73996 24.7263C8.66008 23.8023 9.13931 23.039 9.75172 23.039C13.2664 23.039 14.731 23.0391 16.7812 18.7807C21.8137 8.25513 15.1304 -3.6365 6.87609 1.14419Z" fill="black" />
                                </svg>
                                <p className="text-custom-black/80 text-[0.875rem] lg:text-[1.5rem] leading-relaxed py-[2rem] lg:py-[3rem]">
                                    {slides[index].testimony}
                                </p>
                                <svg className="right-0 absolute hidden lg:block bottom-0" xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                    <path d="M8.6545 17.1523L7.50955 17.1925C-5.03163 17.5139 -0.851238 45.3143 12.5686 37.9625C22.4738 32.539 20.6365 7.59103 10.0391 3.4933C5.35279 1.68547 0.133955 2.97104 4.02145 4.97973C7.34979 6.66704 10.0391 11.5279 9.8527 15.5051C9.79945 16.389 9.29354 17.1523 8.6545 17.1523Z" fill="black" />
                                    <path d="M33.1249 38.9669C45.1868 31.9766 40.2875 1.44439 26.8942 0.118652C23.4061 -0.242912 22.5008 1.00248 25.1368 2.48891C27.693 3.93517 30.9148 10.7647 31.261 15.3847C31.3409 16.3087 30.8616 17.0721 30.2492 17.0721C26.7345 17.0721 25.27 17.072 23.2197 21.3304C18.1873 31.856 24.8706 43.7476 33.1249 38.9669Z" fill="black" />
                                </svg>
                            </div>

                            <div className="flex flex-col">
                                <h4 className="text-lg font-semibold text-custom-black">
                                    {slides[index].name}
                                </h4>
                                <div className="hidden justify-start gap-[0.5rem] mt-[1rem] lg:flex">
                                    {Array.from({ length: slides[index].stars }).map((_, i) => (
                                        <Star key={i} size={24} color="#FFD700" />
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-[0.5rem] h-[0.5rem] rounded-full ${i === index ? "bg-[#AF52DE]" : "bg-gray-300"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
