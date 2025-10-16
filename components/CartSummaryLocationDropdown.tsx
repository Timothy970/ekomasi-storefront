"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLocationsAsync, selectLocations } from "@/lib/features/mall/mallSlice";
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    selectedId: null | number;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
};

export default function CartSummaryLocationDropdown({ selectedId, setSelectedId }: Props) {
    const locations = useAppSelector(selectLocations)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        dispatch(getLocationsAsync())
    }, [dispatch, router])

    const handleValueChange = (val: string) => {
        const newLocationId = Number(val);
        setSelectedId(newLocationId);

        const params = new URLSearchParams(searchParams.toString());
        if (newLocationId) {
            params.set("location_id", String(newLocationId));
        } else {
            params.delete("location_id");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            value={selectedId === null ? undefined : String(selectedId)}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[3rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
                <SelectValue placeholder="Select store..." />
            </SelectTrigger>
            <SelectContent className="">
                {locations?.locations.map((loc) => (
                    <SelectItem key={loc.id} value={String(loc.id)}>
                        {loc.location} — Ksh {loc.charge}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
