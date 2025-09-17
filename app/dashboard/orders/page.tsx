"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import DashboardOrders from '@/components/DashboardOrders'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getOrdersAsync, selectUserOrders } from '@/lib/features/cart/cartSlice'
import { Order } from '@/lib/features/types'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Orders() {
    const router = useRouter()
    const token = useAppSelector(selectUserToken)
    const dispatch = useAppDispatch()
    const orders = useAppSelector(selectUserOrders)
    const [ongoingOrders, setOngoingOrders] = useState<Order[]>([]);
    const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (token) {
            dispatch(getOrdersAsync())
        }
    }, [token])

    useEffect(() => {
        if (orders?.length) {
            const ongoing = orders.filter(
                (order) => order.status === "pending" || order.status === "delivered"
            );
            const cancelled = orders.filter(
                (order) => order.status === "canceled" || order.status === "returned"
            );

            setOngoingOrders(ongoing);
            setCancelledOrders(cancelled);
        } else {
            setOngoingOrders([]);
            setCancelledOrders([]);
        }
    }, [orders]);

    const handleStartShopping = () => {
        router.replace('/')
    }

    return (
        <Navigation>
            <DashboardLayout>
                <div className="space-y-4">
                    <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
                        <div className='flex flex-col gap-y-[1rem]'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    d="M33 18.7998L15 8.4198M6.54 13.9198L24 24.0198L41.46 13.9198M24 44.1598V23.9998M42 31.9998V15.9998C41.9993 15.2984 41.8141 14.6094 41.4631 14.0021C41.112 13.3948 40.6075 12.8905 40 12.5398L26 4.5398C25.3919 4.18873 24.7021 4.00391 24 4.00391C23.2979 4.00391 22.6081 4.18873 22 4.5398L8 12.5398C7.39253 12.8905 6.88796 13.3948 6.53692 14.0021C6.18589 14.6094 6.00072 15.2984 6 15.9998V31.9998C6.00072 32.7013 6.18589 33.3902 6.53692 33.9975C6.88796 34.6048 7.39253 35.1091 8 35.4598L22 43.4598C22.6081 43.8109 23.2979 43.9957 24 43.9957C24.7021 43.9957 25.3919 43.8109 26 43.4598L40 35.4598C40.6075 35.1091 41.112 34.6048 41.4631 33.9975C41.8141 33.3902 41.9993 32.7013 42 31.9998Z"
                                    stroke="#1E1E1E"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className='text-[1.5rem] font-bold'>My Orders</p>
                        </div>
                    </div>

                    {
                        !orders?.length && <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
                            <div className='flex flex-col gap-y-[1rem]'>
                                <p className='text-[1.125rem] font-semibold'>No active orders yet!</p>
                                <p className='text-[1.125rem]'>Currently, you have no active orders. Find something you love. We’ve curated new styles just for you.</p>
                                <Button onClick={handleStartShopping} className='mt-[2rem] max-w-[20rem]'>Start Shopping</Button>
                            </div>
                        </div>
                    }

                    {
                        orders?.length > 0 && <Tabs defaultValue="ongoing" className="w-full bg-white">
                            <TabsList className="border-b gap-x-[1rem] rounded-none bg-white border-none">
                                <TabsTrigger
                                    value="ongoing"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-b-[#804A9D] data-[state=active]:font-semibold data-[state=active]:text-[#804A9D] border-t-0 border-l-0 border-r-0 rounded-none bg-white"
                                >
                                    ONGOING / DELIVERED
                                </TabsTrigger>
                                <TabsTrigger
                                    value="canceled"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-b-[#804A9D] data-[state=active]:font-semibold data-[state=active]:text-[#804A9D] border-t-0 border-l-0 border-r-0 rounded-none bg-white"
                                >
                                    CANCELED / RETURNED
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="ongoing" className='w-full'>
                                <DashboardOrders orders={ongoingOrders} />
                            </TabsContent>

                            <TabsContent value="canceled" className='w-full'>
                                <DashboardOrders orders={cancelledOrders}  />
                            </TabsContent>
                        </Tabs>
                    }
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
