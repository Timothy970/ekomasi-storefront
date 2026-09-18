"use client"
import React, { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    getUserProfileAsync,
    selectUserProfile,
    updateUserProfileAsync,
} from "@/lib/features/user/userSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { triggerToast } from "@/app/utils/toastUtils"
import { ToastType } from "@/lib/features/toast/toastSlice"
import VerifyOtpModal from "./VerifyOtpModal"
import { Label } from "./ui/label"

export default function UpdateUserForm() {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectUserProfile)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    })
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)

    const formatPhoneForDisplay = (phone: string) => {
        if (phone.startsWith("254") && phone.length === 12) {
            return "0" + phone.slice(3)
        }
        return phone
    }

    const normalizePhoneForSave = (phone: string) => {
        let val = phone.trim()
        if (val.startsWith("0")) {
            val = "254" + val.slice(1)
        }
        return val.replace(/\s+/g, "")
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const isValidKenyanPhone = (phone: string) => {
        const regex = /^254\d{9}$/;
        return regex.test(phone);
    }

    const fetchUserProfile = (message: string, type: ToastType) => {
        if (type === "success") {
            setIsOtpModalOpen(true)
        }
        triggerToast(message, type)
    }

    const handleVerifySuccess = () => {
        dispatch(getUserProfileAsync())
    }

    const handleSubmit = () => {
        const { first_name, last_name, email, phone_number } = formData

        if (!first_name || !last_name || !email || !phone_number) {
            triggerToast("Please fill in all required fields before updating.", "error")
            return
        }

        const normalizedPhone = normalizePhoneForSave(phone_number)

        if (!isValidKenyanPhone(normalizedPhone)) {
            triggerToast("Please enter a valid Kenyan phone number starting with 0 or 254.", "error")
            return
        }

        dispatch(updateUserProfileAsync({ data: { ...formData, phone_number: normalizedPhone }, fetchUserProfile }))
    }

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                phone_number: formatPhoneForDisplay(profile.phone || ""),
            })
        }
    }, [profile])

    const isFormComplete = useMemo(() => {
        return (
            formData.first_name.trim() !== "" &&
            formData.last_name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.phone_number.trim() !== "" &&
            isValidKenyanPhone(normalizePhoneForSave(formData.phone_number))
        )
    }, [formData])

    const isFormChanged = useMemo(() => {
        if (!profile) return true

        const normalizedProfilePhone = normalizePhoneForSave(profile.phone || "")

        return (
            formData.first_name !== (profile.first_name || "") ||
            formData.last_name !== (profile.last_name || "") ||
            formData.email !== (profile.email || "") ||
            normalizePhoneForSave(formData.phone_number) !== normalizedProfilePhone
        )
    }, [formData, profile])

    return (
        <div className="space-y-4 w-full">
            <VerifyOtpModal
                isOpen={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
                onVerifySuccess={handleVerifySuccess}
            />
            <div>
                <p className="text-[0.875rem]">
                    Feel free to edit any of your details below so your Ekomasi account is totally up to date. (* Indicates a required field)
                </p>
            </div>

            <div className="max-w-md flex flex-col gap-y-[1rem]">
                <div className="flex flex-col">
                    <Label className="mb-1 font-semibold">
                        First Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        value={formData.first_name}
                        onChange={e => handleChange("first_name", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-border"
                    />
                </div>

                <div className="flex flex-col">
                    <Label className="mb-1 font-semibold">
                        Last Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        value={formData.last_name}
                        onChange={e => handleChange("last_name", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-border"
                    />
                </div>

                <div className="flex flex-col gap-y-[0.5rem]">
                    <span className="text-[0.875rem] font-semibold">
                        Email <span className="text-red-400">*</span>
                    </span>
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                        >
                            <path
                                d="M18 0.5H2C0.897 0.5 0 1.397 0 2.5V14.5C0 15.603 0.897 16.5 2 16.5H18C19.103 16.5 20 15.603 20 14.5V2.5C20 1.397 19.103 0.5 18 0.5ZM18 2.5V3.011L10 9.234L2 3.012V2.5H18ZM2 14.5V5.544L9.386 11.289C9.56111 11.4265 9.77733 11.5013 10 11.5013C10.2227 11.5013 10.4389 11.4265 10.614 11.289L18 5.544L18.002 14.5H2Z"
                                fill="currentColor"
                            />
                        </svg>

                        <Input
                            name="email"
                            value={formData.email}
                            required
                            onChange={e => handleChange("email", e.target.value)}
                            placeholder="Email Address*"
                            className="p-[0.5rem] h-[2.5rem] pl-10 pr-4 py-2 border text-[0.875rem] border-border"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <Label className="mb-1 font-semibold">
                        Phone Number <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        placeholder="0797493262"
                        value={formData.phone_number}
                        onChange={e => handleChange("phone_number", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-border"
                    />
                </div>

                <Button
                    className="bg-secondary-tenant h-[2.5rem] mt-[1rem]"
                    onClick={handleSubmit}
                    disabled={!isFormComplete || !isFormChanged}
                >
                    Update
                </Button>
            </div>
        </div>
    )
}
