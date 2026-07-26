"use client"
import React from 'react'
import MobileCategories from '../MobileCategories'
import { useAppSelector } from '@/lib/hooks';
import { selectUserProfile, selectUserToken } from '@/lib/features/user/userSlice';
import { selectCart, selectCartId } from '@/lib/features/cart/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { selectWishLists } from '@/lib/features/wishlist/wishlistSlice';
import Icons from '../ui/custom-icons';

interface AppHeaderProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ isOpen, setIsOpen }: AppHeaderProps) {
    const profile = useAppSelector(selectUserProfile)
    const token = useAppSelector(selectUserToken)
    const cartId = useAppSelector(selectCartId)
    const cart = useAppSelector(selectCart)
    const router = useRouter()
    const wishlist = useAppSelector(selectWishLists)

    const handleIcons = () => {
        if (!token) {
            router.push("/user/login")
        }
    }

    return (
        <div className={`lg:hidden fixed px-[1.25rem] pb-[2.5rem]  top-0 left-0 h-full w-full bg-white overflow-hidden text-custom-black transform transition-transform duration-500 ease-in-out z-60 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex justify-between items-start mt-[1rem] w-full">
                <div className='flex justify-start items-center mb-[1.25rem]'>
                    <div className='mr-[0.5rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round w-[1.5rem] h-[1.5rem]"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                    </div>

                    <h2 className='text-custom-black text-center font-poppins text-sm font-normal leading-[150%]'>Hi {profile?.first_name ?? ""}!</h2>
                </div>

                <div onClick={() => setIsOpen(false)} className='h-[1.5rem] w-[1.5rem]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x w-[1.5rem] h-[1.5rem] flex-shrink-0"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
            </div>

            <div className='max-h-[70%] w-full overflow-y-scroll' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <MobileCategories />
            </div>

            <div className='mt-[2.5rem] flex flex-col gap-y-[1rem] w-full'>
                {
                    token ? <Link href={`/dashboard/wishlist`}>
                        <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                            <div className='relative'>
                                {
                                    wishlist && wishlist[0]?.products && wishlist[0]?.products?.length > 0 ? <div className='bg-secondary-tenant h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                                        <span className='text-xs'>{wishlist[0]?.products?.length}</span>
                                    </div> : <></>
                                }

                                <Icons.HeartIcon />
                            </div>

                            <h2 className='text-custom-black text-sm'>Favorites</h2>
                        </div>
                    </Link> : <div onClick={handleIcons} className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                        <Icons.HeartIcon />
                        <h2 className='text-custom-black text-sm'>Favorites</h2>
                    </div>
                }

                {
                    token ? <Link href={`/dashboard/orders`}>
                        <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                            <Icons.OrderIcon />
                            <h2 className='text-custom-black text-sm'>Orders</h2>
                        </div>
                    </Link> : <div onClick={handleIcons} className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                        <Icons.OrderIcon />
                        <h2 className='text-custom-black text-sm'>Orders</h2>
                    </div>
                }

                {
                    cartId ? <Link href={`/cart/${cartId}`}>
                        <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                            <div className='relative'>
                                {
                                    cart && cart?.cart_items && cart?.cart_items?.length > 0 && <div className='bg-secondary-tenant h-[1rem] w-[1rem] absolute -bottom-[5px] -right-[5px] flex justify-center items-center rounded-full'>
                                        <span className='text-xs'>{cart?.cart_items?.length}</span>
                                    </div>
                                }

                                <Icons.CartIcon />
                            </div>

                            <h2 className='text-custom-black text-sm'>Bag</h2>
                        </div>
                    </Link> : <div onClick={handleIcons} className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                        <Icons.CartIcon />
                        <h2 className='text-custom-black text-sm'>Bag</h2>
                    </div>
                }
            </div>
        </div>
    )
}
