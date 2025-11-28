import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ReviewsList from './ReviewsList'

export default function CustomerReviews() {
    return (
        <div className='mt-[2rem]'>
            <div className='flex flex-row justify-between gap-x-[1rem]'>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ratings" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rates</SelectLabel>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By: Newest" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {[
                                { value: "date:old-to-new", label: "Date: old to new" },
                                { value: "date:new-to-old", label: "Date: new to old" },
                            ].map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="
                                        h-[2rem] px-3 text-[0.875rem] cursor-pointer
                                        hover:text-purple-500
                                        data-[highlighted]:bg-transparent
                                        focus:bg-transparent
                                        "
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-[2rem]'>
                <ReviewsList />
            </div>
        </div>
    )
}
