"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import { FormData, Warehouse } from "@/lib/features/types";
import { selectWarehouses } from "@/lib/features/navigation/navigationSlice";

type WareHouseDropdownProps = {
    onSelect?: (warehouse: Warehouse | undefined) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function WareHouseDropdown({
    onSelect,
    setFormData,
}: WareHouseDropdownProps) {
    const warehouses = useAppSelector(selectWarehouses);
    const [selectedId, setSelectedId] = useState<string>("");

    const handleSelect = (val: string) => {
        setSelectedId(val);

        const selectedWarehouse = warehouses?.find(
            (w) => String(w.warehouse_id) === val
        );

        onSelect?.(selectedWarehouse);

        setFormData((prev) => ({
            ...prev,
            warehouse_id: val,
        }));
    };

    return (
        <Select value={selectedId} onValueChange={handleSelect}>
            <SelectTrigger className="w-full p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]">
                <SelectValue placeholder="Select pick up store ..." />
            </SelectTrigger>

            <SelectContent>
                {warehouses?.map((warehouse) => (
                    <SelectItem
                        key={warehouse.warehouse_id}
                        value={String(warehouse.warehouse_id)}
                    >
                        {warehouse.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
