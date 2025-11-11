"use client";
import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function PriceRangeSlider({
    min = 0,
    max = 1000,
    step = 10,
    defaultValues = [100, 800],
    onChange,
}: {
    min?: number;
    max?: number;
    step?: number;
    defaultValues?: [number, number];
    onChange?: (values: [number, number]) => void;
}) {
    const [values, setValues] = React.useState<[number, number]>(defaultValues);

    const handleValueChange = (newValues: [number, number]) => {
        setValues(newValues);
        onChange?.(newValues);
    };

    const handleClear = () => {
        setValues([min, max]);
    }

    return (
        <div className='flex flex-col gap-y-[1rem] my-[1rem] w-full'>
            <div className='bg-[rgba(201,160,255,0.55)] w-full flex justify-between items-center h-[2.5rem] px-[0.5rem]'>
                <h2 className='text-custom-black font-bold text-[0.875rem] lg:text-[1.125rem] leading-[1.6875rem] capitalize'>
                    Price
                </h2>

                <button onClick={handleClear}>
                    <span className="font-[400] text-base">Clear</span>
                </button>
            </div>

            <Slider
                id="price-range"
                min={min}
                max={max}
                step={step}
                value={values}
                onValueChange={handleValueChange}
                className="w-full mt-[1.5rem]"
            />

            <div className="flex justify-between text-sm mt-[1.5rem]">
                <Label htmlFor="min" className="text-black text-[1.125rem]">
                    {min.toLocaleString()}
                </Label>
                <Label htmlFor="max" className="text-black text-[1.125rem]">
                    {max.toLocaleString()}
                </Label>
            </div>
        </div>
    );
}
