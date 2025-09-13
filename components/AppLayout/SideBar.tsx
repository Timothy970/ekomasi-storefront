"use client"
import React from 'react'
import MobileCategories from '../MobileCategories'

interface AppHeaderProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ isOpen, setIsOpen }: AppHeaderProps) {
    return (
        <div className={`lg:hidden fixed px-[1.25rem] pb-[2.5rem]  top-0 left-0 h-full w-full bg-white overflow-hidden text-custom-black transform transition-transform duration-500 ease-in-out z-60 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex justify-between items-start mt-[1rem] w-full]">
                <div className='flex justify-start items-center mb-[1.25rem]'>
                    <div className='mr-[0.5rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round w-[1.5rem] h-[1.5rem]"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                    </div>

                    <h2 className='text-custom-black text-center font-poppins text-sm font-normal leading-[150%]'>Hi User!</h2>
                </div>

                <div onClick={() => setIsOpen(false)} className='h-[1.5rem] w-[1.5rem]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x w-[1.5rem] h-[1.5rem] flex-shrink-0"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
            </div>

            <div className='max-h-[70%] w-full overflow-y-scroll' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <MobileCategories />
            </div>

            <div className='mt-[2.5rem] flex flex-col gap-y-[1rem] w-full'>
                <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
                    <h2 className='text-custom-black text-sm'>Favorites</h2>
                </div>

                <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M20.5 6.00013C20.5097 5.93046 20.5097 5.85979 20.5 5.79013V5.71013C20.4828 5.65431 20.4593 5.60063 20.43 5.55013C20.417 5.52133 20.4002 5.49441 20.38 5.47013L20.28 5.34013L20.08 5.19013L11.08 0.190127C10.928 0.102359 10.7555 0.0561523 10.58 0.0561523C10.4045 0.0561523 10.232 0.102359 10.08 0.190127L1.08 5.19013L0.99 5.26013L0.88 5.34013C0.850949 5.37283 0.827316 5.40996 0.81 5.45013C0.778005 5.47882 0.750974 5.51261 0.73 5.55013C0.704035 5.59401 0.683867 5.64106 0.67 5.69013C0.664405 5.72323 0.664405 5.75703 0.67 5.79013C0.601246 5.84941 0.543669 5.92054 0.5 6.00013V14.0001C0.501298 14.1783 0.550188 14.3529 0.641611 14.5059C0.733035 14.6588 0.86367 14.7846 1.02 14.8701L10.02 19.8701C10.0613 19.8942 10.1049 19.9143 10.15 19.9301H10.25C10.4143 19.97 10.5857 19.97 10.75 19.9301H10.85L10.99 19.8701L19.99 14.8701C20.1445 14.7833 20.2731 14.657 20.3627 14.5041C20.4523 14.3513 20.4997 14.1773 20.5 14.0001V6.00013ZM10.5 9.87013L3.56 6.00013L6.32 4.48013L13.15 8.38013L10.5 9.87013ZM10.5 2.15013L17.44 6.00013L15.2 7.25013L8.37 3.34013L10.5 2.15013ZM2.5 7.70013L9.5 11.6201V17.3001L2.5 13.4101V7.70013ZM11.5 17.3001V11.6201L14.5 9.94013V13.0001L16.5 12.0001V8.82013L18.5 7.71013V13.4101L11.5 17.3001Z" fill="black" />
                    </svg>
                    <h2 className='text-custom-black text-sm'>Orders</h2>
                </div>

                <div className='flex flex-row justify-start items-center gap-x-[1rem] w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M2.72222 20H18.2778C19.5033 20 20.5 19.103 20.5 18V7C20.5 6.73478 20.3829 6.48043 20.1746 6.29289C19.9662 6.10536 19.6836 6 19.3889 6H16.0556V5C16.0556 2.243 13.5633 0 10.5 0C7.43667 0 4.94444 2.243 4.94444 5V6H1.61111C1.31643 6 1.03381 6.10536 0.825437 6.29289C0.617063 6.48043 0.5 6.73478 0.5 7V18C0.5 19.103 1.49667 20 2.72222 20ZM7.16667 5C7.16667 3.346 8.66222 2 10.5 2C12.3378 2 13.8333 3.346 13.8333 5V6H7.16667V5ZM2.72222 8H4.94444V10H7.16667V8H13.8333V10H16.0556V8H18.2778L18.28 18H2.72222V8Z" fill="black" />
                    </svg>
                    <h2 className='text-custom-black text-sm'>Bag</h2>
                </div>
            </div>
        </div>
    )
}
