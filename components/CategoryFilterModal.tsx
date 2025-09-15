import React from 'react'
import CategoryFilter from './CategoryFilter'

interface CategoryFilterModal {
    setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    openFilterModal: boolean
}

export default function CategoryFilterModal({ setOpenFilterModal, openFilterModal }: CategoryFilterModal) {
    return (
        <div className={`block lg:hidden w-screen absolute inset-0 bg-white h-screen transform transition-transform duration-500 ease-in-out z-60 p-[1rem] ${openFilterModal ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex w-full justify-between items-center'>
                <span className='font-bold text-[1.25rem]'>Filters</span>

                <span onClick={() => setOpenFilterModal(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x-icon lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
            </div>

            <div className='w-full'>
                <CategoryFilter page='category' />
            </div>
        </div>
    )
}
