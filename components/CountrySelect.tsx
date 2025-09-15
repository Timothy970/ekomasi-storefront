// CountrySelect.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormData } from "@/lib/features/types"
import React from "react"

const countries = [
    { code: "KE", name: "Kenya" },
    { code: "UG", name: "Uganda" },
    { code: "TZ", name: "Tanzania" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
]

export default function CountrySelect({ formData, setFormData }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> }) {
    return (
        <Select
            value={formData.country}
            onValueChange={(val) =>
                setFormData((prev: FormData) => ({ ...prev, country: val }))
            }
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[2rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
                <SelectValue placeholder="Country/Region" />
            </SelectTrigger>
            <SelectContent>
                {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                        {country.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
