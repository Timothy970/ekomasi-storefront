import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const cart_items = [
    {
        "product_id": "p1",
        "name": "Cozy Sofa",
        "description": "A comfortable 3-seater fabric sofa.",
        "sku": "SOFA-001",
        "price": 499.99,
        "category_id": "furniture",
        "stock_quantity": 12,
        "created_at": "2025-09-10T12:00:00Z",
        'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
    },
    {
        "product_id": "p2",
        "name": "Wireless Headphones",
        "description": "Noise-cancelling over-ear headphones.",
        "sku": "HEAD-123",
        "price": 199.99,
        "category_id": "electronics",
        "stock_quantity": 35,
        "created_at": "2025-09-10T12:05:00Z",
        'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
    },
    {
        "product_id": "p3",
        "name": "Standing Desk",
        "description": "Adjustable height standing desk.",
        "sku": "DESK-789",
        "price": 299.99,
        "category_id": "office",
        "stock_quantity": 20,
        "created_at": "2025-09-10T12:10:00Z",
        'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
    },
    {
        "product_id": "p4",
        "name": "Running Shoes",
        "description": "Lightweight and comfortable running shoes.",
        "sku": "SHOE-456",
        "price": 89.99,
        "category_id": "sports",
        "stock_quantity": 50,
        "created_at": "2025-09-10T12:15:00Z",
        'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
    },
    {
        "product_id": "p5",
        "name": "Smartwatch",
        "description": "Fitness tracking smartwatch with heart rate monitor.",
        "sku": "WATCH-101",
        "price": 149.99,
        "category_id": "wearables",
        "stock_quantity": 40,
        "created_at": "2025-09-10T12:20:00Z",
        'image': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww'
    }
]

export default function CartSummary() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <h2 className='text-[2rem] font-bold self-start'>Cart Summary</h2>

            <p className='self-start font-bold text-[1.5rem]'>KES 140,000</p>

            <div className='flex flex-row justify-between items-center w-full mt-[1.5rem]'>
                <span>Do you have a Promo Code ?</span>
            </div>

            <div className='w-full flex items-center justify-start mt-[0.75rem] gap-x-[1rem]'>
                <Input placeholder='Promo Code' className='h-[3rem] max-w-[15rem] border-black' />
                <Button className='h-[3rem] border rounded-md bg-white text-black border-black'>
                    Apply
                </Button>
            </div>

            <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem] mt-[1.5rem]'>
                <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Subtotal</span>
                    <span className='text-black text-base'>0</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Estimated Shipping & Handling</span>
                    <span className='text-black text-base'>0</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Estimated Tax</span>
                    <span className='text-black text-base'>0</span>
                </div>
                <div className='flex justify-between w-full'>
                    <span className='text-base text-[#444]'>Discount Total</span>
                    <span className='text-black text-base'>0</span>
                </div>
            </div>

            <h2 className='text-[2rem] font-bold self-start mt-[1.5rem]'>Cart</h2>

            <div className='w-full mt-[2rem] flex flex-col gap-y-[1.5rem]'>
                {
                    cart_items?.map((item, index) => {
                        return <div key={index?.toString()} className='gap-x-[1.5rem] w-full flex justify-between items-start py-[1.5rem] border-b border-[rgba(0,0,0,0.40)]'>
                            <div className="w-[40%] h-full">
                                <div className="relative w-full h-[10rem] md:h-[15rem]">
                                    <Image
                                        src={item?.image}
                                        alt="Example"
                                        fill
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            <div className='w-[50%] flex flex-col gap-y-[0.5rem] font-semibold'>
                                <span className='text-[1.25rem]'>KES 13,000</span>
                                <span className='text-base'>Flip 4-in-1 Convertible Carrier - Leopard</span>

                                <div className='flex flex-row w-full gap-x-[0.5rem]'>
                                    <span className='text-base font-light'>Brand:</span>
                                    <span className='text-base font-light'>Infantino</span>
                                </div>

                                <div className='flex flex-row w-full gap-x-[0.5rem]'>
                                    <span className='text-base font-light'>Color:</span>
                                    <span className='text-base font-light'>Grey</span>
                                </div>

                                <div className='flex flex-row w-full gap-x-[0.5rem]'>
                                    <span className='text-base font-light'>Size:</span>
                                    <span className='text-base font-light'>One Size</span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
