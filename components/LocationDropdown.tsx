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
import { DeliveryLocation, FormData } from "@/lib/features/types";
import { useRouter } from "next/navigation";

type Props = {
    onSelect?: (loc: DeliveryLocation | undefined) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    formData: FormData
};

export default function LocationDropdown({ onSelect, formData, setFormData }: Props) {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const locations = useAppSelector(selectLocations)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const selected = React.useMemo(
        () => locations?.locations?.find((l) => l.id === selectedId) ?? undefined,
        [locations, selectedId]
    );

    useEffect(() => {
        if (onSelect) onSelect(selected);

        if (selected) {
            setFormData((prev: FormData) => ({
                ...prev,
                deliveryLocationId: selected.id,
                deliveryLocationName: selected.location,
                deliveryCharge: selected.charge,
            }));
        }
    }, [selected, onSelect, setFormData]);

    useEffect(() => {
        dispatch(getLocationsAsync())
    }, [dispatch, router])

    return (
        <Select
            value={selectedId === null ? undefined : String(selectedId)}
            onValueChange={(val) => setSelectedId(Number(val))}
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[2rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
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
