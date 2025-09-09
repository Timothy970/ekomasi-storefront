import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ProductQuantitySelect() {
    return (
        <div className="text-black mt-[0.5rem]">
            <Select defaultValue="1">
                <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent className="w-[50px]">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
