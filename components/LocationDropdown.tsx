import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import { selectLocations } from "@/lib/features/mall/mallSlice";
import React, { useEffect } from "react";
import { DeliveryLocation } from "@/lib/features/types";

type Props = {
    onSelect?: (loc: DeliveryLocation | undefined) => void;
};

export default function LocationDropdown({ onSelect }: Props) {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const locations = useAppSelector(selectLocations)

    const selected = React.useMemo(
        () => locations?.locations?.find((l) => l.id === selectedId) ?? undefined,
        [locations, selectedId]
    );

    useEffect(() => {
        if (onSelect) onSelect(selected);
    }, [selected, onSelect]);

    return (
        <div className="w-full mx-auto">
            <Select
                value={selectedId === null ? undefined : String(selectedId)}
                onValueChange={(val) => setSelectedId(Number(val))}
            >
                <SelectTrigger className="w-full h-[7rem] border border-[rgba(0,0,0,0.40)]">
                    <SelectValue placeholder="Select store..." />
                </SelectTrigger>
                <SelectContent className="max-w-full">
                    {locations?.locations.map((loc) => (
                        <SelectItem key={loc.id} value={String(loc.id)}>
                            {loc.location} — Ksh {loc.charge}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
