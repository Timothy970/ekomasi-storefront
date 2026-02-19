"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
    selectStatus,
    updateUserProfileVerifyAsync,
} from '@/lib/features/user/userSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import LoadingIndicator from './LoadingIndicator'
import { X } from 'lucide-react'
import { ToastType } from '@/lib/features/toast/toastSlice'

interface VerifyOtpModalProps {
    isOpen: boolean
    onClose: () => void
    onVerifySuccess: () => void
}

export default function VerifyOtpModal({ isOpen, onClose, onVerifySuccess }: VerifyOtpModalProps) {
    const length = 4
    const [code, setCode] = useState<string[]>(Array(length).fill(""))
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)


    useEffect(() => {
        if (isOpen) {
            // Focus first input when modal opens
            setTimeout(() => focusAt(0), 100)
        } else {
            setCode(Array(length).fill(""))
        }
    }, [isOpen])

    const focusAt = (idx: number) => {
        const el = inputsRef.current[idx]
        if (el) el.focus()
    }

    const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "")
        if (!val) {
            const next = [...code]
            next[idx] = ""
            setCode(next)
            return
        }

        const digits = val.split("")
        const next = [...code]
        let i = idx
        for (const d of digits) {
            if (i >= length) break
            next[i] = d
            i++
        }
        setCode(next)
        if (idx < length - 1) focusAt(Math.min(idx + digits.length, length - 1))
    }

    const handleKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (code[idx]) return
            if (idx > 0) {
                const prev = [...code]
                prev[idx - 1] = ""
                setCode(prev)
                focusAt(idx - 1)
                e.preventDefault()
            }
        }

        if (e.key === "ArrowLeft" && idx > 0) {
            focusAt(idx - 1)
            e.preventDefault()
        }

        if (e.key === "ArrowRight" && idx < length - 1) {
            focusAt(idx + 1)
            e.preventDefault()
        }

        if (e.key === "Enter") {
            const otpValue = code.join("").trim()
            if (otpValue.length === length) {
                handleSubmit(e as any)
            } else {
                triggerToast(`Please enter all ${length} digits of the code`, "error")
                const firstEmpty = code.findIndex((c) => c === "")
                if (firstEmpty !== -1) focusAt(firstEmpty)
            }
            e.preventDefault()
        }
    }


    const handlePaste = (idx: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "")
        if (!pasted) return
        e.preventDefault()
        const next = [...code]
        let i = idx
        for (const d of pasted) {
            if (i >= length) break
            next[i] = d
            i++
        }
        setCode(next)
        if (i - 1 < length) focusAt(Math.min(i, length - 1))
    }

    const value = code.join("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const otpValue = value?.trim()

        if (otpValue?.length !== length) {
            triggerToast(`Please enter all ${length} digits of the code`, "error")
            return
        }
        dispatch(updateUserProfileVerifyAsync({ otp: otpValue, fetchUserProfile: handleUserProfile }))

    }

    const handleUserProfile = (message: string, type: ToastType) => {
        if (type === "success") {
            onVerifySuccess()
            onClose()

        }
        triggerToast(message, type)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[6000] flex justify-center items-center bg-black/50">
            <div className="bg-white max-w-[30rem] w-[95%] p-[2rem] flex flex-col gap-y-[1.5rem] relative rounded-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Verify OTP</h2>
                    <p className="text-sm text-gray-600">
                        Enter the {length}-digit code you received
                    </p>
                </div>

                <form className="flex flex-col items-center gap-y-[1.5rem]" onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-center items-center gap-x-[1rem]">
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
                                className="h-[3.5rem] w-[3.5rem] text-center text-xl font-bold border-gray-300 focus:border-[#AF52DE] focus:ring-1 focus:ring-[#AF52DE]"
                                aria-label={`Digit ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <Button
                        disabled={status === "loading" || value.length !== length}
                        type="submit"
                        className="w-full bg-[#AF52DE] hover:bg-[#9a47c5] h-[3rem] text-white font-semibold"
                    >
                        {status === "loading" && <LoadingIndicator textColor="text-white" />}
                        Verify & Update
                    </Button>
                </form>
            </div>
        </div>
    )
}
