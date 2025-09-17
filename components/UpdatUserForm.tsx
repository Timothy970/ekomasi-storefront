"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { selectUserProfile } from "@/lib/features/user/userSlice"
import { useAppSelector } from "@/lib/hooks"

export default function UpdateUserForm() {
    const profile = useAppSelector(selectUserProfile)
    const [formData, setFormData] = useState({
        first_name: "Tim",
        last_name: "Kim",
        email: "timothy.kimani@roamtech.com",
        phone_number: "254746166343",
    })

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log("Form submitted:", formData)
        // Call your API here
    }

    return (
        <div className="space-y-4 w-full max-w-md ">
            <div className="flex flex-col">
                <label className="mb-1 font-semibold">First Name</label>
                <Input
                    value={formData.first_name}
                    onChange={e => handleChange("first_name", e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Last Name</label>
                <Input
                    value={formData.last_name}
                    onChange={e => handleChange("last_name", e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Email</label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange("email", e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 font-semibold">Phone Number</label>
                <Input
                    value={formData.phone_number}
                    onChange={e => handleChange("phone_number", e.target.value)}
                />
            </div>

            <Button onClick={handleSubmit}>Update</Button>
        </div>
    )
}
