"use client"
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { requestOtpAsync, selectMessage, selectPhoneOrEmailValue, selectStatus, verifyOtpAsync } from '@/lib/features/user/userSlice';
import { useRouter, useSearchParams } from 'next/navigation'
import { triggerToast } from '@/app/utils/toastUtils';
import LoadingIndicator from './LoadingIndicator';

export default function OtpForm() {
    const length = 4;
    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const dispatch = useAppDispatch()
    const emailOrPhone = useAppSelector(selectPhoneOrEmailValue)
    const message = useAppSelector(selectMessage)
    const router = useRouter();
    const searchParams = useSearchParams()
    const status = useAppSelector(selectStatus)

    const focusAt = (idx: number) => {
        const el = inputsRef.current[idx];
        if (el) el.focus();
    };

    const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (!val) {
            const next = [...code];
            next[idx] = "";
            setCode(next);
            return;
        }

        // If user typed multiple digits (mobile keyboards) spread across fields
        const digits = val.split("");
        const next = [...code];
        let i = idx;
        for (const d of digits) {
            if (i >= length) break;
            next[i] = d;
            i++;
        }
        setCode(next);
        if (idx < length - 1) focusAt(Math.min(idx + digits.length, length - 1));
    };

    const handleKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (code[idx]) return; // let default clear when not empty
            if (idx > 0) {
                // move left and clear previous
                const prev = [...code];
                prev[idx - 1] = "";
                setCode(prev);
                focusAt(idx - 1);
                e.preventDefault();
            }
        }
        if (e.key === "ArrowLeft" && idx > 0) {
            focusAt(idx - 1);
            e.preventDefault();
        }
        if (e.key === "ArrowRight" && idx < length - 1) {
            focusAt(idx + 1);
            e.preventDefault();
        }
    };

    const handlePaste = (idx: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pasted) return;
        e.preventDefault();
        const next = [...code];
        let i = idx;
        for (const d of pasted) {
            if (i >= length) break;
            next[i] = d;
            i++;
        }
        setCode(next);
        if (i - 1 < length) focusAt(Math.min(i, length - 1));
    };

    const value = code.join("");

    function handleRequestOtp() {
        if (emailOrPhone) {
            dispatch(requestOtpAsync({ phone_number: emailOrPhone }))
        }
    }

    function handleToastRedirect(
        message: string,
        successRedirect = "/",
    ) {
        if (message === "Verification successful") {
            triggerToast(message, "success");

            if (successRedirect) {
                const redirect = searchParams.get("redirect")

                if (redirect) {
                    router.push(`/checkout/member`);
                } else {
                    router.push(successRedirect);
                }
            }
        } else {
            if (message) {
                triggerToast(message, "error");
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[0-9]{7,15}$/ // simple phone check: digits only, 7–15 chars

        if (emailRegex.test(emailOrPhone) && value) {
            dispatch(verifyOtpAsync({ email: emailOrPhone, otp: value }))
                .unwrap()
                .then((res: { message: string; }) => {
                    handleToastRedirect(res?.message, "/");
                })
                .catch(() => {
                    handleToastRedirect("Invalid or expired OTP", "");
                });
        } else if (phoneRegex.test(emailOrPhone) && value) {
            dispatch(verifyOtpAsync({ phone_number: emailOrPhone, otp: value }))
                .unwrap()
                .then((res: { message: string; }) => {
                    handleToastRedirect(res?.message, "/");
                })
                .catch(() => {
                    handleToastRedirect("Invalid or expired OTP", "");
                });
        }
    };

    return (
        <form className="w-full mt-[2rem] flex justify-center items-center flex-col">
            <input type="hidden" name="otp" value={value} />

            <div className="flex flex-row justify-center items-center gap-x-[1rem] justify-items-center">
                {code.map((digit, idx) => (
                    <Input
                        key={idx}
                        ref={(el) => {
                            inputsRef.current[idx] = el
                        }}
                        value={digit}
                        onChange={handleChange(idx)}
                        onKeyDown={handleKeyDown(idx)}
                        onPaste={handlePaste(idx)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        autoComplete="one-time-code"
                        className="h-[3.3rem] lg:h-[3rem] caret-white text-white w-[3.3rem] lg:w-[3rem] text-center text-xl tracking-wider rounded-2xl border-white"
                        aria-label={`Digit ${idx + 1}`}
                    />
                ))}
            </div>

            <div className='mt-[1.5rem]'>
                <p className='text-[color:var(--Color-Scheme-1-Foreground,#FFF)] text-center font-poppins text-[0.875rem] font-normal leading-[195%]'>You didn’t receive any code? <button onClick={handleRequestOtp}>Resend Code</button></p>
            </div>

            <Button disabled={status === "loading"} onClick={handleSubmit} variant="outline" className='mt-[2rem] w-full max-w-[30rem] bg-[#AF52DE] outline-none border-none text-white font-poppins text-[0.875rem] font-normal leading-[195%] h-[3.3rem] lg:h-[3rem]'>
                {
                    status == "loading" && <LoadingIndicator textColor="text-white" />
                }
                Continue
            </Button>
        </form>
    )
}
