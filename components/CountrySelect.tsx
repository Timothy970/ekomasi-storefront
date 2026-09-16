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
    { code: "Kenya", name: "Kenya" },
    { code: "Uganda", name: "Uganda" },
    { code: "Tanzania", name: "Tanzania" },
    { code: "United States", name: "United States" },
    { code: "United Kingdom", name: "United Kingdom" },
    { code: "Germany", name: "Germany" },
]

export default function CountrySelect({ formData, setFormData }: Readonly<{ formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> }>) {
    return (
        <Select
            value={formData.country}
            required
            onValueChange={(val) =>
                setFormData((prev: FormData) => ({ ...prev, country: val }))
            }
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[2.5rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
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
