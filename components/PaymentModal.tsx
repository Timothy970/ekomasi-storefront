"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { triggerToast } from "@/app/utils/toastUtils";
import { usePayment } from "@/app/ClientLayout";
import { ToastType } from "@/lib/features/toast/toastSlice";
import { Order, PaymentFormData } from "@/lib/features/types";
import LoadingIndicator from "./LoadingIndicator";
import { Input } from "./ui/input";
import { makePayment } from "@/lib/features/cart/cartAPI";
import { getOrderAsync } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";

interface ReviewModalProps {
    openPaymentModal: boolean;
    order: Order;
}

export default function PaymentModal({ order, openPaymentModal }: ReviewModalProps) {
    const { setOpenPaymentModal } = usePayment();
    const [formData, setFormData] = useState<PaymentFormData>({ phone_number: "", order_id: "" });
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const [isFormValid, setIsFormValid] = useState(false);
    const [blurDone, setBlurDone] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsFormValid(!!formData.phone_number);
    }, [formData]);

    const handlePhoneBlur = (name: keyof PaymentFormData) => {
        setFormData((prev) => {
            let phone = prev[name] ?? "";

            if (!phone) return prev;

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone)) return prev;

            phone = phone.trim().replace(/\D/g, "");

            if (phone.startsWith("0")) phone = phone.substring(1);
            if (phone && !phone.startsWith("254")) phone = "254" + phone;
            if (phone.length > 12) phone = phone.slice(0, 12);

            return { ...prev, [name]: phone };
        });

        setBlurDone(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setBlurDone(false);
    };

    const handleReviewResponse = (message: string, type: ToastType) => {
        triggerToast(message, type);
        dispatch(getOrderAsync(order?.order_id))
        setOpenPaymentModal(false);
    };

    const handleSubmit = async () => {
        if (!isFormValid) {
            triggerToast("Please enter a valid phone number.", "error");
            return;
        }

        setStatus("loading");

        const paymentData = {
            phone_number: formData.phone_number,
            order_id: order.order_id,
        };

        if (paymentData?.order_id && paymentData?.phone_number !== undefined && typeof paymentData?.phone_number === "string") {
            const paymentRes = await makePayment(paymentData);
            setStatus("idle");

            if (paymentRes?.message && !paymentRes?.data?.errorMessage) {
                handleReviewResponse("Payment successful!", "success");
            } else if (paymentRes?.data?.errorMessage) {
                handleReviewResponse(paymentRes.data.errorMessage, "error");
            } else {
                handleReviewResponse("Payment processed.", "success");
            }
        }
    };

    if (!openPaymentModal) return null;

    return (
        <div className="absolute inset-0 z-[60] h-screen w-screen flex justify-center items-center">
            <div
                className="absolute bg-black/50 z-[65] h-screen w-screen"
                onClick={() => setOpenPaymentModal(false)}
            >
                <div className="flex p-[1rem] pt-[3rem] w-full justify-end">
                    <X className="text-white" />
                </div>
            </div>

            <div className="bg-white flex hide-scrollbar flex-col items-center p-[3rem] gap-y-[1rem] rounded m-[1rem] z-[70]">
                <div className="flex flex-col justify-center items-center gap-y-[2rem] w-[23rem]">
                    <h2 className="font-bold text-[1.125rem]">Enter Payment Details</h2>

                    <div className="flex flex-col gap-y-[1.5rem] w-full">
                        <Input
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            onBlur={() => handlePhoneBlur("phone_number")}
                            placeholder="254712345678"
                            className="p-[0.5rem] h-[2.5rem] border text-[0.875rem]"
                        />

                        <Button
                            disabled={status === "loading" || !isFormValid || !blurDone}
                            onClick={handleSubmit}
                            className="h-[2.5rem] bg-[#AF52DE] text-white rounded-[1.5rem] w-full flex items-center justify-center gap-x-[0.75rem]"
                        >
                            {status === "loading" ? (
                                <LoadingIndicator textColor="text-white" />
                            ) : (
                                "Make Payment"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
