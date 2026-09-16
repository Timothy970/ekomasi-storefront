import React from 'react'
import CategoryFilter from './CategoryFilter'
import { Button } from './ui/button'

interface CategoryFilterModalProps {
    readonly setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    readonly openFilterModal: boolean
}

export default function CategoryFilterModal({ setOpenFilterModal, openFilterModal }: Readonly<CategoryFilterModalProps>) {
    return (
        <div className={`block lg:hidden w-screen absolute inset-0 bg-white h-screen overflow-y-scroll transform transition-transform duration-500 ease-in-out z-60 p-[1rem] ${openFilterModal ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex w-full justify-between items-center'>
                <span className='font-bold text-[1.25rem]'>Filters</span>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close filters"
                    onClick={() => setOpenFilterModal(false)}
                    className="cursor-pointer"
                >
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
                </Button>
            </div>

            <div className='w-full'>
                <CategoryFilter
                    setOpenFilterModal={setOpenFilterModal}
                    page='category'
                />
            </div>
        </div>
    )
}

