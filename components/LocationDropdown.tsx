import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLocationsAsync, selectLocations } from "@/lib/features/mall/mallSlice";
import React, { useEffect, useMemo } from "react";
import { DeliveryLocation, FormData } from "@/lib/features/types";
import { useRouter, useSearchParams } from "next/navigation";
import { getBuyNowCartAsync, getCartAsync, selectBuyNowCartId, selectCartId } from "@/lib/features/cart/cartSlice";

type Props = {
    onSelect?: (loc: DeliveryLocation | undefined) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    formData: FormData;
    isBuyNow: boolean
};

export default function LocationDropdown({ onSelect, formData, setFormData, isBuyNow }: Props) {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
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
            } else {
                if (cartId && selectedId) {
                    dispatch(getCartAsync({ cart_id: cartId, location_id: selectedId }));
                }
            }
        }
    }, [selected, onSelect, setFormData]);

    useEffect(() => {
        dispatch(getLocationsAsync())
    }, [dispatch, router])

    useEffect(() => {
        if (!cartId) return;

        const locationIdFromUrl = searchParams.get("location_id");
        const idNum = locationIdFromUrl && !isNaN(Number(locationIdFromUrl)) ? Number(locationIdFromUrl) : null;

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
            value={selectedId === null ? undefined : String(selectedId)}
            onValueChange={(val) => {
                if (!val) return;
                const num = Number(val);
                if (!isNaN(num)) setSelectedId(num);
            }}
        >
            <SelectTrigger className="w-full p-[0.5rem] h-[3rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem]">
                <SelectValue placeholder="Select shipping location..." />
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
