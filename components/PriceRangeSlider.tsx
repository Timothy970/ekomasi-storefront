"use client";
import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useFilterQuery } from "@/app/ClientLayout";

export default function PriceRangeSlider({
    min = 0,
    max = 1000,
    step = 10,
    defaultValues = [100, 800],
    notChangingValues = [0, 1000],
    onChange,
}: Readonly<{
    min?: number;
    max?: number;
    step?: number;
    defaultValues?: [number, number];
    notChangingValues?: [number, number];
    onChange?: (values: [number, number]) => void;
}>) {
    const [values, setValues] = React.useState<[number, number]>(defaultValues);
    const { setQuery } = useFilterQuery()

    React.useEffect(() => {
        setValues(defaultValues);
    }, [defaultValues]);

    const handleValueChange = (newValues: [number, number]) => {
        setValues(newValues);
        onChange?.(newValues);
    };

    const handleClear = () => {
        setValues(notChangingValues);
        onChange?.(notChangingValues);

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        params.delete("minPrice");
        params.delete("maxPrice");

        const newQuery = "?" + params.toString();
        setQuery(newQuery);

        url.search = params.toString();
        window.history.replaceState({}, "", url.toString());
    };


    return (
        <div className='flex flex-col gap-y-[1rem] my-[1rem] w-full'>
            <div className='bg-secondary-tenant w-full flex justify-between items-center h-[2.5rem] px-[0.5rem]'>
                <h2 className='text-muted font-bold text-[0.875rem] lg:text-[1.125rem] leading-[1.6875rem] capitalize'>
                    Price
                </h2>

                <button onClick={handleClear} className="cursor-pointer">
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
                    {values[0].toLocaleString()}
                </Label>
                <Label htmlFor="max" className="text-black text-[1.125rem]">
                    {values[1].toLocaleString()}
                </Label>
            </div>
        </div>
    );
}
