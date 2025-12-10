"use client";
import { useReview } from '@/app/ClientLayout';
import Navigation from '@/components/Navigation';
import OrderDetails from '@/components/OrderDetails';
import OrderDetailsFlow from '@/components/OrderDetailsFlow';
import ReviewModal from '@/components/ReviewModal';
import { Checkbox } from '@/components/ui/checkbox';
import { getOrderAsync, selectUserOrder } from '@/lib/features/cart/cartSlice';
import { getProductReviewAsync } from '@/lib/features/navigation/navigationSlice';
import { selectUserProfile } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { DELIVERY_STATUS, ORDER_STATUS } from '@/lib/utils';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';


export default function Order() {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectUserOrder);
    const profile = useAppSelector(selectUserProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false); const [wantsReturn, setWantsReturn] = useState(false);

    const handleCloseReturn = () => {
        setWantsReturn(false);
    }

    const { openReviewModal } = useReview();
    const [productReviewId, setProductReviewId] = useState<string | undefined>(undefined);
    const [reviewType, setReviewType] = useState<string>("");
    const [reviewId, setReviewId] = useState<string | undefined>(undefined);

    const fetchOrder = async (isIntervalFetch = false) => {
        if (!params?.id) return;

        if (isIntervalFetch) setIsRefreshing(true);

        try {
            await dispatch(getOrderAsync(params.id)).unwrap();
        } catch {
            if (!isIntervalFetch) setError(true);
        } finally {
            if (isIntervalFetch) {
                setTimeout(() => setIsRefreshing(false), 800);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchOrder(false);
    }, [params?.id]);

    useEffect(() => {
        if (!params?.id) return;

        const interval = setInterval(() => {
            fetchOrder(true);
        }, 30000);

        return () => clearInterval(interval);
    }, [params?.id]);


    if (loading) {
        return (
            <Navigation>
                <div className="w-full flex justify-center items-center min-h-[50vh]">
                    <p className="text-base animate-pulse">Loading your order details...</p>
                </div>
            </Navigation>
        );
    }

    if (error || !order) {
        return (
            <Navigation>
                <div className="w-full flex flex-col justify-center items-center min-h-[50vh] text-center px-4">
                    <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                    <p className="text-gray-600">
                        We couldn’t find your order. Please check your link or contact support.
                    </p>
                </div>
            </Navigation>
        );
    }

    return (
        <Navigation>
            <div
                className={`
                    max-w-[90rem] w-full mx-auto flex flex-col items-center justify-center mb-[2rem] md:mb-[2.5rem]
                    transition-colors duration-700
                    ${isRefreshing ? "bg-[rgba(0,0,0,0.03)]" : "bg-transparent"}
                `}
            >
                {order.order_status === "Cancelled" ? (
                    <div className="w-full flex items-center justify-center bg-[#FF3B308F]">
                        <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path
                                    d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                                    fill="black"
                                />
                            </svg>
                            <p className="text-[0.875rem]">Your Order Was Cancelled.</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center bg-[rgba(52,199,89,0.58)]">
                        <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path
                                    d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                                    fill="black"
                                />
                            </svg>
                            <p className="text-[0.875rem]">Your Order Was Successfully Placed.</p>
                        </div>
                    </div>
                )}

                <div className="w-full flex items-center flex-col mt-[1rem] lg:mt-[2.5rem]">
                    <p className="text-[0.875rem]">Thank You!</p>

                    <h2 className="text-[1.125rem] lg:text-[1.5rem] font-bold mt-[1rem]">Order Details</h2>

                    <p className="font-semibold text-base lg:text-[1.125rem] mt-[1rem] lg:mt-[1.5rem] text-center">
                        Check your email for your order confirmation.
                    </p>

                    <div className="flex flex-col items-center mt-[0.5rem] gap-y-[0.5rem]">
                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium text-base lg:text-[1.125rem]">Your order:</span>
                            <span className="font font-medium text-[1.125rem]">{order.order_id}</span>
                        </div>

                        <div className="flex text-custom-black items-center justify-center gap-x-[0.5rem] text-[1.125rem]">
                            <span className="font-medium text-[0.875rem]">Order Date:</span>
                            <span>{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>

                        <div className="flex text-custom-black gap-x-[0.5rem]">
                            <span className="font-medium">Total:</span>
                            <p className="uppercase font-medium">
                                {"KES " +
                                    new Intl.NumberFormat("en-KE", { minimumFractionDigits: 0 }).format(order.total_amount ?? 0)}
                            </p>
                        </div>

                        {profile && (
                            <p className="font-medium mt-[1rem] text-center text-wrap text-[0.875rem] lg:text-base">
                                We have sent the order confirmation details to{" "}
                                <span className="font-bold">{profile.email}</span>
                            </p>
                        )}
                    </div>
                </div>

                <OrderDetailsFlow order={order} />

                {
                    ((order?.order_status.toLowerCase() === ORDER_STATUS?.COMPLETED.toLowerCase() && order?.delivery_status.toLowerCase() === DELIVERY_STATUS?.DELIVERED.toLowerCase()) ||
                        (order?.order_status.toLowerCase() === "delivered" && order?.delivery_status.toLowerCase() === DELIVERY_STATUS?.DELIVERED.toLowerCase())) &&
                    <div className='w-full mt-[2rem] flex flex-col justify-center items-center'>
                        <div className='flex w-full justify-between max-w-56 items-start border-t border-[#AAA] pt-[1.25rem]'>
                            <h3 className='font-bold'>Return Items?</h3>
                            <Checkbox
                                checked={wantsReturn}
                                onCheckedChange={(checked) => setWantsReturn(checked === true)}
                                className="border border-black rounded-none h-[1rem] lg:h-[1.125rem] w-[1rem] lg:w-[1.125rem]"
                            />
                        </div>
                        {wantsReturn && (
                            <p className="text-[0.875rem] lg:text-base mt-[1rem]">
                                Select Items you want to return
                            </p>
                        )}
                    </div>
                }

                <OrderDetails order={order} toReturn={wantsReturn} onCloseReturn={handleCloseReturn} setProductReviewId={setProductReviewId} setReviewType={setReviewType} setReviewId={setReviewId} />

                {openReviewModal && (
                    <ReviewModal
                        openReviewModal={openReviewModal}
                        setProductReviewId={setProductReviewId}
                        productReviewId={productReviewId}
                        orderId={params?.id}
                        reviewType={reviewType}
                        reviewId={reviewId}
                    />
                )}
            </div>
        </Navigation>
    );
}
