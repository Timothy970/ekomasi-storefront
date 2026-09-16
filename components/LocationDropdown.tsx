import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLocationsAsync, selectLocations } from "@/lib/features/mall/mallSlice";
import React, { useEffect, useMemo, useState } from "react";
import { DeliveryLocation, FormData } from "@/lib/features/types";
import { useRouter, useSearchParams } from "next/navigation";
import { getBuyNowCartAsync, getCartAsync, selectBuyNowCartId, selectCartId } from "@/lib/features/cart/cartSlice";
import { Search } from "lucide-react";

type Props = {
    onSelect?: (loc: DeliveryLocation | undefined) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    isBuyNow: boolean
};

export default function LocationDropdown({ onSelect, setFormData, isBuyNow }:Readonly< Props>) {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const locations = useAppSelector(selectLocations)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const cartId = useAppSelector(selectCartId);
    const buyNowCartId = useAppSelector(selectBuyNowCartId)

    const selected = useMemo(
        () => locations?.locations?.find((l) => l.id === selectedId) ?? undefined,
        [locations, selectedId]
    );

    const filteredLocations = useMemo(() => {
        const all = locations?.locations ?? [];
        if (!search.trim()) return all;
        return all.filter((loc) =>
            loc.location.toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [locations, search]);

    // Reset search when dropdown closes
    useEffect(() => {
        if (!open) setSearch("");
    }, [open]);

    useEffect(() => {
        if (onSelect) onSelect(selected);

        if (selected) {
            setFormData((prev: FormData) => ({
                ...prev,
                deliveryLocationId: selected.id,
                deliveryLocationName: selected.location,
                deliveryCharge: selected.charge,
            }));

            if (isBuyNow) {
                if (buyNowCartId && selectedId) {
                    dispatch(getBuyNowCartAsync({ cart_id: buyNowCartId, location_id: selectedId }));
                }
            } else if (cartId && selectedId) {
                dispatch(getCartAsync({ cart_id: cartId, location_id: selectedId }));
            }
        }
    }, [selected, onSelect, setFormData]);

    useEffect(() => {
        dispatch(getLocationsAsync())
    }, [dispatch, router])

    useEffect(() => {
        if (!cartId) return;

        const locationIdFromUrl = searchParams.get("location_id");
        const idNum = locationIdFromUrl && !Number.isNaN(Number(locationIdFromUrl)) ? Number(locationIdFromUrl) : null;

        if (idNum) {
            setSelectedId(idNum);
            dispatch(getCartAsync({ cart_id: cartId, location_id: idNum }));
        } else {
            setSelectedId(null);
        }
    }, [searchParams, cartId, dispatch]);

    useEffect(() => {
        if (!selected) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("location_id", String(selected.id));
        router.replace(`?${params.toString()}`);
    }, [selected, searchParams, router]);

    return (
        <Select
            open={open}
            onOpenChange={setOpen}
            value={selectedId === null ? undefined : String(selectedId)}
            onValueChange={(val) => {
                if (!val) return;
                const num = Number(val);
                if (!Number.isNaN(num)) setSelectedId(num);
            }}
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[2.5rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
                <SelectValue placeholder="Select shipping location..." />
            </SelectTrigger>
            <SelectContent className="p-0 max-h-none">
                {/* Search input — stops Radix from intercepting keystrokes */}
                <div className="sticky top-0 z-10 bg-white px-2 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 border border-gray-200 rounded px-2">
                        <Search className="size-3.5 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            placeholder="Search location..."
                            className="w-full py-1.5 text-sm outline-none bg-transparent placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Scrollable list capped at 260px */}
                <div className="max-h-[260px] overflow-y-auto">
                    {filteredLocations.length === 0 ? (
                        <p className="px-3 py-3 text-sm text-gray-800 text-center">No locations found</p>
                    ) : (
                        filteredLocations.map((loc) => (
                            <SelectItem key={loc.id} value={String(loc.id)}>
                                {loc.location} — Ksh {loc.charge}
                            </SelectItem>
                        ))
                    )}
                </div>
            </SelectContent>
        </Select>
    );
}
