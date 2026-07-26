"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { requestOtpAsync, resetStatus, selectOtpResendExpiry, selectPhoneOrEmailValue, selectStatus, selectUserToken, setOtpResendExpiry, verifyOtpAsync } from '@/lib/features/user/userSlice';
import { useRouter, useSearchParams } from 'next/navigation'
import { triggerToast } from '@/app/utils/toastUtils';
import LoadingIndicator from './LoadingIndicator';

export default function OtpForm() {
    const length = 4;
    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const dispatch = useAppDispatch()
    const emailOrPhone = useAppSelector(selectPhoneOrEmailValue)
    const router = useRouter();
    const searchParams = useSearchParams()
    const status = useAppSelector(selectStatus)
    const [resendAvailable, setResendAvailable] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(0)
    const otpResendExpiry = useAppSelector(selectOtpResendExpiry)
    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = (value: string) => /^\+?[0-9]{7,15}$/.test(value);
    const token = useAppSelector(selectUserToken)

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
            if (code[idx]) return;
            if (idx > 0) {
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

        if (e.key === "Enter") {
            const otpValue = code.join("").trim();

            if (otpValue.length === length) {
                handleSubmit(e as any);
            } else {
                triggerToast(`Please enter all ${length} digits of the code`, "error");
                const firstEmpty = code.findIndex((c) => c === "");
                if (firstEmpty !== -1) focusAt(firstEmpty);
            }

            e.preventDefault();
        }
    };

    useEffect(() => {
        if (token) {
            router.replace('/');
        }
    }, [token, router]);

    useEffect(() => {
        if (!emailOrPhone) {
            router.replace('/user/login');
        }
    }, [emailOrPhone, router]);

    useEffect(() => {
        if (!otpResendExpiry) {
            setResendAvailable(true)
            setSecondsLeft(0)
            return
        }

        const checkResend = () => {
            const now = Date.now()
            if (now >= otpResendExpiry) {
                setResendAvailable(true)
                setSecondsLeft(0)
                dispatch(setOtpResendExpiry(null))
            } else {
                setResendAvailable(false)
                setSecondsLeft(Math.ceil((otpResendExpiry - now) / 1000))
            }
        }

        checkResend()
        const interval = setInterval(checkResend, 1000)

        return () => clearInterval(interval)
    }, [otpResendExpiry, dispatch])

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

    function checkType(value: string) {
        if (isEmail(value)) return "email";
        if (isPhone(value)) return "phone";
        return "unknown";
    }

    function handleRequestOtp(e: React.FormEvent) {
        e.preventDefault();

        if (!resendAvailable) {
            triggerToast("Wait for 60 seconds to elapse to request a new OTP!", "error")
            return
        }

        if (emailOrPhone) {
            if (checkType(emailOrPhone) == "email") {
                dispatch(requestOtpAsync({ email: emailOrPhone }))
                dispatch(setOtpResendExpiry(Date.now() + 60000))
            } else if (checkType(emailOrPhone) == "phone") {
                dispatch(requestOtpAsync({ phone_number: emailOrPhone }))
                dispatch(setOtpResendExpiry(Date.now() + 60000))
            } else {
                triggerToast("No valid phone or email was found!", "error")
            }

        } else {
            triggerToast("No valid phone or email was found!", "error")
        }
    }

    function handleToastRedirect(
        message: string,
        successRedirect = "/",
    ) {
        if (message === "Sign-in verification successful") {
            triggerToast(message, "success");

            if (successRedirect) {
                const redirect = searchParams.get("redirect")

                if (redirect) {
                    router.replace(`/checkout/member`);
                } else {
                    router.replace(successRedirect);
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

        const otpValue = value?.trim();

        if (otpValue?.length !== length) {
            triggerToast(`Please enter all ${length} digits of the code`, "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,15}$/; // simple phone check

        if (emailRegex.test(emailOrPhone)) {
            dispatch(verifyOtpAsync({ email: emailOrPhone, otp: otpValue }))
                .unwrap()
                .then((res: { message: string }) => {
                    handleToastRedirect(res?.message, "/");
                    dispatch(resetStatus())
                })
                .catch(() => {
                    handleToastRedirect("Invalid or expired OTP", "");
                    dispatch(resetStatus())
                });
        } else if (phoneRegex.test(emailOrPhone)) {
            dispatch(verifyOtpAsync({ phone_number: emailOrPhone, otp: otpValue }))
                .unwrap()
                .then((res: { message: string }) => {
                    handleToastRedirect(res?.message, "/");
                    dispatch(resetStatus())
                })
                .catch(() => {
                    handleToastRedirect("Invalid or expired OTP", "");
                    dispatch(resetStatus())
                });
        } else {
            triggerToast("Invalid phone or email format", "error");
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
                <p className='text-[color:var(--Color-Scheme-1-Foreground,#FFF)] text-center font-poppins text-[0.875rem] font-normal leading-[195%]'>
                    You didn’t receive any code? {" "}
                    <button
                        style={{ cursor: !resendAvailable ? 'not-allowed' : 'pointer' }}
                        disabled={!resendAvailable}
                        onClick={handleRequestOtp}
                        className='underline h-[2rem]'
                    >
                        {resendAvailable ? 'Resend Code' : `Resend in ${secondsLeft}s`}
                    </button>
                </p>
            </div>

            <Button
                disabled={status === "loading"}
                onClick={handleSubmit}
                variant="outline"
                className='mt-[2rem] w-full max-w-[30rem] bg-primary-tenant hover:opacity-90 outline-none border-none text-white font-poppins text-[0.875rem] font-normal leading-[195%] h-[3.3rem] lg:h-[2.5rem]'
            >
                {
                    status == "loading" && <LoadingIndicator textColor="text-white" />
                }
                Continue
            </Button>
        </form>
    )
}
