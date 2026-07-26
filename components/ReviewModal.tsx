"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addReviewAsync, editReviewAsync, selectUserProfile } from '@/lib/features/user/userSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import { useReview } from '@/app/ClientLayout'
import { getOrderAsync } from '@/lib/features/cart/cartSlice'
import { ToastType } from '@/lib/features/toast/toastSlice'
import { getProductReviewAsync, selectProductReview } from '@/lib/features/navigation/navigationSlice'

interface ReviewModalProps {
    setProductReviewId: React.Dispatch<React.SetStateAction<string | undefined>>;
    openReviewModal: boolean;
    productReviewId: string | undefined;
    orderId: string
    reviewType: string
    reviewId?: string | undefined;
}

export default function ReviewModal({ setProductReviewId, productReviewId, orderId, reviewType, reviewId }: ReviewModalProps) {
    const [score, setScore] = useState(0);
    const [details, setDetails] = useState("");
    const userProfile = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch()
    const { openReviewModal, setOpenReviewModal } = useReview()
    const existingReview = useAppSelector(selectProductReview)

    const handleReviewResponse = (message: string, success: ToastType) => {
        dispatch(getOrderAsync(orderId))
        triggerToast(message, success)
        setScore(0);
        setDetails("");
        setOpenReviewModal(false)
        setProductReviewId(undefined)
    }

    useEffect(() => {
        if (reviewType === 'edit' && productReviewId && reviewId) {
            dispatch(getProductReviewAsync({ product_id: productReviewId, review_id: reviewId }));
        }
    }, [reviewType, productReviewId, reviewId, dispatch]);

    useEffect(() => {
        if (reviewType === 'edit' && existingReview) {
            setScore(existingReview?.score || 0);
            setDetails(existingReview?.details || "");
        }
    }, [reviewType, existingReview]);


    const handleSubmit = () => {
        if (score === 0) return triggerToast("Please select a star rating", "error");
        if (!details.trim()) return triggerToast("Please type your review", "error");

        if (userProfile?.user_id && productReviewId) {
            let data = {
                user_id: userProfile?.user_id,
                productId: productReviewId,
                score,
                details
            }

            if (data?.productId && data?.user_id && data?.details) {
                if (reviewType === 'edit' && reviewId) {
                    dispatch(editReviewAsync({ ...data, reviewId, handleReviewResponse }))
                    return;
                }
                dispatch(addReviewAsync({ ...data, handleReviewResponse }))
            }
        }
    };

    if (!openReviewModal) {
        return <></>
    }

    return (
        <div className='absolute inset-0 z-[60] h-screen w-screen flex justify-center items-center'>
            <div className='absolute bg-black/50 z-[65] h-screen w-screen' onClick={() => setOpenReviewModal(false)}>

            </div>

            <div className='bg-white relative flex hide-scrollbar flex-col items-center justify-center p-[3rem] gap-y-[1rem] rounded m-[1rem] z-[70]'>
                <div onClick={() => setOpenReviewModal(false)} className='flex absolute top-1 right-[1rem] p-[1rem] w-full justify-end'>
                    <X className='text-black' />
                </div>

                <div className='flex flex-col justify-center items-center gap-y-[2rem] w-[23rem]'>
                    <h2 className='font-bold text-[1.125rem]'>{reviewType === 'edit' ? 'Edit your review' : 'Add your review'}</h2>

                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const filled = i < score;
                            return (
                                <svg
                                    key={i}
                                    onClick={() => setScore(i + 1)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="26"
                                    viewBox="0 0 20 19"
                                    className="cursor-pointer transition-transform hover:scale-110"
                                    fill={filled ? "#FFCC00" : "#E5E7EB"}
                                >
                                    <path d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 
                                        10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 
                                        13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 
                                        6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 
                                        11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 
                                        18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 
                                        15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 
                                        19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 
                                        12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 
                                        7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 
                                        6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z"
                                    />
                                </svg>
                            );
                        })}
                    </div>

                    <Textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-black"
                        rows={4}
                    />

                    <Button onClick={handleSubmit} className='h-[2.5rem] bg-secondary-tenant hover:bg-secondary-tenant rounded-[1.5rem] w-full flex items-center justify-center gap-x-[0.75rem]'>
                        {reviewType === 'edit' ? 'Update Review' : 'Submit Review'}
                    </Button>
                </div>
            </div>
        </div>
    )
}