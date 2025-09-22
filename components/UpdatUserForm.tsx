"use client"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUserProfileAsync, selectUserProfile, updateUserProfileAsync } from "@/lib/features/user/userSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

export default function UpdateUserForm() {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectUserProfile)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const fetchUserProfile = () => {
        dispatch(getUserProfileAsync())
    }

    const handleSubmit = () => {
        if (formData) {
            dispatch(updateUserProfileAsync({ data: formData, fetchUserProfile }))
        }
    }

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                phone_number: profile.phone_number || "",
            })
        }
    }, [profile])

    return (
        <div className="space-y-4 w-full ">
            <div>
                <p className="text-[0.875rem]">Feel free to edit any of your details below so your Adenzo account is totally up to date. (* Indicates a required field)</p>
            </div>
            <div className="max-w-md flex flex-col gap-y-[1rem]">

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">First Name</label>
                    <Input
                        value={formData.first_name}
                        onChange={e => handleChange("first_name", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-[rgba(0,0,0,0.40)]"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Last Name</label>
                    <Input
                        value={formData.last_name}
                        onChange={e => handleChange("last_name", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-[rgba(0,0,0,0.40)]"
                    />
                </div>

                <div className='flex flex-col gap-y-[0.5rem]'>
                    <span className='text-[0.875rem] font-semibold'>Email</span>

                    <div className='relative'>
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                            <path d="M18 0.5H2C0.897 0.5 0 1.397 0 2.5V14.5C0 15.603 0.897 16.5 2 16.5H18C19.103 16.5 20 15.603 20 14.5V2.5C20 1.397 19.103 0.5 18 0.5ZM18 2.5V3.011L10 9.234L2 3.012V2.5H18ZM2 14.5V5.544L9.386 11.289C9.56111 11.4265 9.77733 11.5013 10 11.5013C10.2227 11.5013 10.4389 11.4265 10.614 11.289L18 5.544L18.002 14.5H2Z" fill="black" />
                        </svg>

                        <Input
                            name="email"
                            value={formData.email}
                            required
                            disabled={!!profile?.email}
                            onChange={e => handleChange("email", e.target.value)}
                            placeholder='Email Address*'
                            className='p-[0.5rem] h-[3rem] pl-10 pr-4 py-2 border text-[0.875rem] border-[rgba(0,0,0,0.40)] '
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Phone Number</label>
                    <Input
                        placeholder="+254797493262"
                        value={formData.phone_number}
                        onChange={e => handleChange("phone_number", e.target.value)}
                        className="border p-[0.5rem] text-[0.875rem] border-[rgba(0,0,0,0.40)]"
                    />
                </div>

                <Button className="bg-[#AF52DE] h-[2rem mt-[1rem]" onClick={handleSubmit}>Update</Button>
            </div>
        </div>
    )
}
