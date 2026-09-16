import { ProductFeature } from '@/lib/features/types'
import React from 'react'
import { FeaturePreview } from './FeaturePreview'

export default function ProductFeatureSection({ features }: Readonly<{ features: ProductFeature[] }>) {

    return (
        <div className='w-full mx-auto max-w-[90rem] px-[1rem] md:px-[3rem]'>
            {
                features?.map((feature, index) => {
                    return <FeaturePreview key={index?.toString()} feature={feature} />
                })
            }
        </div>
    )
}
