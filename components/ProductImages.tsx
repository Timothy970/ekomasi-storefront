"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProductAsync, selectProduct } from '@/lib/features/navigation/navigationSlice';
import { selectUserToken } from '@/lib/features/user/userSlice';
import { createWishListAsync, getWishListsAsync, selectStatus } from '@/lib/features/wishlist/wishlistSlice';
import LoadingIndicator from './LoadingIndicator';
import { triggerToast } from '@/app/utils/toastUtils';
import { deleteProductFromWishList } from '@/lib/features/wishlist/wishlistAPI';

export default function ProductImages() {
    const [current, setCurrent] = useState(0);
    const product = useAppSelector(selectProduct)
    const token = useAppSelector(selectUserToken)
    const dispatch = useAppDispatch()
    const wishStatus = useAppSelector(selectStatus)

    const prevSlide = () => {
        const urlsLength = product?.urls?.length ? product?.urls.length - 1 : 0;

        setCurrent((prev) => (prev === 0 ? urlsLength : prev - 1));
    };

    const nextSlide = () => {
        const urlsLength = product?.urls?.length ? product?.urls.length : 0;

        setCurrent((prev) => (prev + 1) % urlsLength);
    };

    const handleRemoveWishlist = async (product_id: string) => {
        try {
            const response = await deleteProductFromWishList(product_id);

            if (response?.status_code == 200 || response?.status_code == 201) {
                triggerToast("Product removed from wishlist successfully.", "success");

                if (token) {
                    dispatch(getWishListsAsync(token))
                    dispatch(getProductAsync(product_id))
                }
            } else {
                triggerToast("Failed to remove product from wishlist.", "error");
            }
        } catch (error) {
            triggerToast("An error occurred while removing the product.", "error");
        }
    };

    const handleWishList = (product_id: string) => {
        if (token) {
            if (product?.liked_by_user) {
                handleRemoveWishlist(product_id)
            } else {
                dispatch(createWishListAsync({ token, product_id })).then(() => {
                    dispatch(getProductAsync(product_id))
                    dispatch(getWishListsAsync(token))
                    triggerToast("Product was added to wishlist successfully!", "success");
                })
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-row justify-between">
            {
                product?.urls?.length && <div className="w-auto flex flex-col gap-y-[1rem] hide-scrollbar max-h-[43rem] overflow-y-scroll pr-[1rem]">
                    {product?.urls.map((image, index) => (
                        <div
                            key={index.toString()}
                            className={`relative w-full h-[6.25rem] min-w-[6.25rem] min-h-[6.25rem] max-h-[6.25rem] rounded-md overflow-hidden cursor-pointer transition-all
                          ${index === current ? "border border-[#E8298A] scale-105" : "opacity-70 hover:opacity-100"}`}
                            onClick={() => setCurrent(index)}
                        >
                            <Image
                                src={image?.url}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            }

            <div className="relative w-full max-h-[43rem] overflow-hidden">
                {
                    token && product?.product_id && <div className="absolute inset-0 flex flex-col justify-start items-center text-center z-10">
                        <div className="p-4 h-full w-full flex justify-start">
                            <Button onClick={() => product?.product_id ? handleWishList(product?.product_id) : ''} className='bg-white text-custom-blac px-[1.5rem] rounded-[2.5rem] border border-black min-w-[9rem] h-[2.5rem]'>
                                {
                                    wishStatus == "loading" ? <LoadingIndicator textColor="text-[#AF52DE]" /> : <svg className={`w-[1.5rem] h-[1.5rem] cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M20 7.65831C18.184 5.98849 15.807 5.06172 13.34 5.06165C12.0342 5.06301 10.7416 5.32258 9.53653 5.82543C8.33147 6.32827 7.23775 7.06447 6.31831 7.99165C2.39664 11.93 2.39831 18.09 6.32164 22.0116L18.5416 34.2316C18.825 34.73 19.3716 35.0516 20 35.0516C20.258 35.0491 20.5118 34.9862 20.741 34.8678C20.9703 34.7494 21.1686 34.5789 21.32 34.37L33.6783 22.0116C37.6016 18.0883 37.6016 11.93 33.675 7.98498C32.756 7.05951 31.6631 6.32481 30.4593 5.82312C29.2554 5.32143 27.9642 5.06264 26.66 5.06165C24.193 5.06205 21.8161 5.98877 20 7.65831ZM31.3183 10.3416C33.9233 12.96 33.925 17.05 31.3216 19.655L20 30.9766L8.67831 19.655C6.07497 17.05 6.07664 12.96 8.67497 10.3483C9.94164 9.08831 11.5983 8.39498 13.34 8.39498C15.0816 8.39498 16.7316 9.08831 17.9883 10.345L18.8216 11.1783C18.9763 11.3332 19.16 11.4561 19.3622 11.54C19.5643 11.6238 19.7811 11.667 20 11.667C20.2189 11.667 20.4356 11.6238 20.6378 11.54C20.84 11.4561 21.0237 11.3332 21.1783 11.1783L22.0116 10.345C24.5316 7.82998 28.8016 7.83665 31.3183 10.3416Z" fill={`${product?.liked_by_user ? 'red' : 'black'}`} />
                                    </svg>
                                }
                                <span className='text-[0.875rem]'>Wishlist</span>
                            </Button>
                        </div>
                    </div>
                }

                {
                    product?.urls?.length && <AnimatePresence mode="wait">
                        <motion.div
                            key={product?.urls[current].image_id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-[30rem] md:h-[30.125rem]"
                        >
                            {
                                product?.urls[current].url && <img
                                    src={product?.urls[current].url}
                                    alt="Product"
                                    className="w-full h-full object-cover rounded-md z-0"
                                />
                            }
                        </motion.div>
                    </AnimatePresence>
                }

                {
                    product && product?.urls && product?.urls?.length > 2 && <div className="absolute right-[1rem] bottom-[2rem] flex justify-between items-center gap-[0.5rem] z-10">
                        <Button className="rounded-full border border-black" onClick={prevSlide} variant="outline" size="icon" aria-label="Previous">
                            <ChevronLeft className="h-[3rem] w-[3rem]" />
                        </Button>
                        <Button className="rounded-full border border-black" onClick={nextSlide} variant="outline" size="icon" aria-label="Next">
                            <ChevronRight className="h-[3rem] w-[3rem] rounded-full" />
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}
