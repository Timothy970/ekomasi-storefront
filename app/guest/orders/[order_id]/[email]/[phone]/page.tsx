"use client";
import Navigation from '@/components/Navigation';
import OrderDetails from '@/components/OrderDetails';
import OrderDetailsFlow from '@/components/OrderDetailsFlow';
import { getGuestOrderAsync, selectGuestOrder } from '@/lib/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const guestOrder = useAppSelector(selectGuestOrder);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { order_id, email, phone } = params as {
        order_id: string;
        email: string;
        phone: string;
    };

    useEffect(() => {
        if (order_id && email && phone) {
            dispatch(getGuestOrderAsync({ order_id, email, phone }))
                .unwrap()
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError(true);
        }
    }, [order_id, email, phone, dispatch]);

    if (loading) {
        return (
            <Navigation>
                <div className="w-full flex justify-center items-center min-h-[50vh]">
                    <p className="text-base">Loading your order details...</p>
                </div>
            </Navigation>
        );
    }

    if (error || !guestOrder) {
        return (
            <Navigation>
                <div className="w-full flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
                    <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                    <p className="text-gray-600">
                        We couldn’t find an order matching your details. Please check your link or contact support.
                    </p>
                </div>
            </Navigation>
        );
    }

    return (
        <Navigation>
            <div className="max-w-[90rem] w-full mx-auto flex flex-col items-center justify-center mb-[2rem] md:mb-[2.5rem]">
                {guestOrder?.order_status === "Cancelled" ? (
                    <div className="w-full flex items-center justify-center bg-[#FF3B308F]">
                        <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z" fill="black" />
                            </svg>
                            <p className="text-[0.875rem]">Your Order Was Cancelled.</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center bg-[rgba(52,199,89,0.58)]">
                        <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z" fill="black" />
                            </svg>
                            <p className="text-[0.875rem]">Your Order Was Successfully Placed.</p>
                        </div>
                    </div>
                )}

                <div className="w-full flex items-center flex-col mt-[1rem] lg:mt-[2.5rem]">
                    <p className="text-[0.875rem]">Thank You!</p>
                    <h2 className="text-[1.125rem] lg:text-[1.5rem] font-bold mt-[1rem]">Order Details</h2>
                    <p className="font-semibold text-base mt-[1rem] text-center">Check your email for your order confirmation.</p>

                    <div className="flex flex-col items-center mt-[0.5rem] gap-y-[0.5rem]">
                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium text-base">Your order:</span>
                            <span className="font-medium text-[1.125rem]">{guestOrder.order_id}</span>
                        </div>

                        <div className="flex text-custom-black items-center justify-center gap-x-[0.5rem] text-[1.125rem]">
                            <span className="font-medium text-[0.875rem]">Order Date:</span>
                            <span>{new Date(guestOrder.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium">Total:</span>
                            <p className="uppercase font-medium">
                                {"KES " + new Intl.NumberFormat("en-KE").format(guestOrder.total_amount ?? 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <OrderDetailsFlow order={guestOrder} />
                <OrderDetails order={guestOrder} />
            </div>
        </Navigation>
    );
}
