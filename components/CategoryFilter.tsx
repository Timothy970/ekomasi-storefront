import { useFilter } from '@/app/ClientLayout'
import React from 'react'

export default function CategoryFilter() {
    const { openFilterModal, setOpenFilterModal } = useFilter()
    console.log(openFilterModal, 'openFilterModal')

    return (
        <div className='mt-4 lg:mt-0 w-full bg-yellow-300 h-auto'>CategoryFilter</div>
    )
}
