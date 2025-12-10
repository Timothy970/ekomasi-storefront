import React, { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import { useAppSelector } from '@/lib/hooks';
import { selectUserProfile } from '@/lib/features/user/userSlice';
import { connectWebSocket } from '@/lib/utils/websocket';

interface PaymentProcessingModalProps {
    isOpen: boolean;
    orderId: string | null;
    deliveryId: string | null;
    onPaymentConfirmed: () => void;
    onPaymentFailed: () => void;
    onClose: () => void;
}

export default function PaymentProcessingModal({
    isOpen,
    orderId,
    deliveryId,
    onPaymentConfirmed,
    onPaymentFailed,
    onClose,
}: PaymentProcessingModalProps) {
    const [status, setStatus] = useState<'connecting' | 'processing' | 'error' | 'success' | 'failed'>('connecting');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const profile = useAppSelector(selectUserProfile);
    const [socket, setSocket] = useState<ReturnType<typeof connectWebSocket> | null>(null);
    const userId = profile?.user_id;
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const timeout = setTimeout(() => {
            setStatus('error');
            setErrorMessage('Payment processing took too long. Please try again or contact support.');
        }, 2 * 60 * 1000);

        setTimeoutId(timeout);

        const params: Record<string, string> = {};
        if (userId) {
            params.user_id = userId;
        }
        if (orderId && deliveryId) {
            params.order_id = orderId;
            params.delivery_id = deliveryId;
        }

        const connection = connectWebSocket(params, {
            onOpen: () => {
                setStatus('processing');
            },
            onMessage: (msg) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    setTimeoutId(null);
                }

                if (msg.event === 'payment_success') {
                    setStatus('success');
                    handleClearout(true);
                } else if (msg.event === 'payment_failed') {
                    setStatus('failed');
                    setErrorMessage(msg.message || 'Payment was not successful. Please try again.');
                    handleClearout(false);
                } else if (msg.event === 'payment_error') {
                    setStatus('error');
                    setErrorMessage(msg.message || 'An error occurred during payment processing');
                    handleClearout(false);
                }
            },
            onError: (err) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    setTimeoutId(null);
                }
                setStatus('error');
                setErrorMessage('Connection error. Please try again.');
                handleClearout(false);
            },
            onClose: (event) => {
                console.log("WebSocket closed", event);
            },
        });

        setSocket(connection);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            connection?.close();
        };
    }, [isOpen, userId, orderId, deliveryId]);

    const handleClearout = (isSuccess: boolean) => {
        setTimeout(() => {
            if (socket) {
                socket.close();
            }
            if (isSuccess) {
                onPaymentConfirmed();
            } else {
                onPaymentFailed();
            }
        }, 3000);

    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[9999] h-screen w-screen flex justify-center items-center'>
            <div className='absolute inset-0 bg-black/50 z-[9998]' />
            <div className='bg-white flex hide-scrollbar flex-col items-center justify-center w-[90vw] rounded md:w-[450px] p-[2rem] gap-y-[1rem] m-[1rem] overflow-y-scroll z-[9999] relative'>
                <div className="w-full text-center mb-4">
                    <h2 className="text-[1.125rem] font-semibold text-custom-black">
                        {status === 'connecting' && 'Connecting to Payment'}
                        {status === 'processing' && 'Processing Payment'}
                        {status === 'success' && 'Payment Successful'}
                        {status === 'failed' && 'Payment Failed'}
                        {status === 'error' && 'Payment Error'}
                    </h2>
                    {orderId && (
                        <p className="text-[0.75rem] text-gray-500 mt-1">
                            Order ID: {orderId}
                        </p>
                    )}
                </div>
                <div className="w-full flex flex-col items-center gap-y-[1.5rem]">
                    {status === 'connecting' && (
                        <>
                            <div className="py-4">
                                <LoadingIndicator textColor="text-[#AF52DE]" />
                            </div>
                            <p className="text-[0.875rem] text-gray-600 text-center">
                                Establishing secure connection to payment gateway...
                            </p>
                        </>
                    )}
                    {status === 'processing' && (
                        <>
                            <div className="py-4">
                                <LoadingIndicator textColor="text-[#AF52DE]" />
                            </div>
                            <p className="text-[0.875rem] text-gray-600 text-center mb-4">
                                Please complete the payment on your phone. This may take a few moments...
                            </p>
                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[0.5rem]">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[0.875rem] font-medium text-gray-900">Order Created</p>
                                        <p className="text-[0.75rem] text-gray-500">Successfully prepared your order</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[0.5rem]">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-[#AF52DE] border-t-transparent rounded-full animate-spin" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[0.875rem] font-medium text-gray-900">Payment Authorization</p>
                                        <p className="text-[0.75rem] text-gray-500">Waiting for confirmation...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4 p-3 bg-blue-50 rounded-[0.5rem] border border-blue-100">
                                <p className="text-[0.75rem] text-blue-800 text-center">
                                    Keep this window open while completing payment
                                </p>
                            </div>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-[1rem] font-semibold text-green-600 mb-2">Payment Confirmed</h3>
                                <p className="text-[0.875rem] text-gray-600">
                                    Your payment has been processed successfully. Your order is being prepared.
                                </p>
                            </div>
                        </>
                    )}

                    {status === 'failed' && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-11a9 9 0 110 18 9 9 0 010-18z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-[1rem] font-semibold text-orange-600 mb-2">Payment Failed</h3>
                                <p className="text-[0.875rem] text-gray-600">
                                    {errorMessage || 'Your payment could not be processed. Please try again.'}
                                </p>
                            </div>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-[1rem] font-semibold text-red-600 mb-2">Connection Error</h3>
                                <p className="text-[0.875rem] text-gray-600">
                                    {errorMessage || 'Unable to process payment. Please try again.'}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {(status === 'error' || status === 'failed') && (
                    <div className="w-full flex justify-end gap-[0.75rem] mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 h-[2.5rem] bg-white text-custom-black text-[0.875rem] border border-black rounded-[0.5rem] hover:bg-gray-50 transition-colors flex-1"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}