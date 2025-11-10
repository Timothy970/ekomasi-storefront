"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import type { FormData } from '@/lib/features/types'
import { useAppDispatch } from '@/lib/hooks'
import { createUserAddressAsync, getUserAddressAsync } from '@/lib/features/address/addressSlice'
import { Button } from './ui/button'
import CountrySelect from './CountrySelect'
import { triggerToast } from '@/app/utils/toastUtils'

type AddNewAddressProps = {
    setAddNewAdress: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewAddress({ setAddNewAdress }: AddNewAddressProps) {
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<FormData>({
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        country: '',
    })

    const REQUIRED_FIELDS: { key: keyof FormData; label: string }[] = [
        { key: "country", label: "Country" },
        { key: "address", label: "Address" },
        { key: "city", label: "City" },
        { key: "postalCode", label: "Postal Code" },
        { key: "postalCode", label: "Postal Code" },
        { key: "apartment", label: "Apartment, suite, etc." },];

    const isFormComplete = (form: FormData): boolean => {
        for (const { key } of REQUIRED_FIELDS) {
            const value = form[key];
            if (
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === "string" && value.trim() === "")
            ) {
                return false;
            }
        }
        return true;
    };

    const validateForm = (form: FormData): boolean => {
        for (const { key, label } of REQUIRED_FIELDS) {
            const value = form[key];

            if (
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === "string" && value.trim() === "")
            ) {
                triggerToast(`${label} is required.`, "error");
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        setIsFormValid(isFormComplete(formData));
    }, [formData]);

    const addressPayload = (formData: FormData) => {
        return {
            address: formData.address,
            apartment: formData.apartment,
            city: formData.city,
            country: formData.country ?? "",
            zip_code: formData.postalCode,
        };
    };

    const refetchAddress = (status: string) => {
        if (status === 'success') {
            triggerToast("Address updated successfully!", "success");
        } else {
            triggerToast("Address update failed!", "error");
        }
        dispatch(getUserAddressAsync());
        setAddNewAdress(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm(formData)) return;

        const addressFormDetails = addressPayload(formData);
        dispatch(createUserAddressAsync({ data: addressFormDetails, refetchAddress }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1.5rem] mt-[2rem] lg:mt-0 mb-[2rem] lg:mb-[2.5rem]'>
            <h2 className='text-[1.5rem] font-bold'>Add New Address</h2>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Country <span className='text-red-500'>*</span></span>
                <CountrySelect formData={formData} setFormData={setFormData} />
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Address <span className='text-red-500'>*</span></span>
                <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder='Address*'
                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                />
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>
                    Apartment, suite, etc. <span className='text-red-500'>*</span>
                </span>
                <Input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    required
                    placeholder='Apartment, suite, etc.'
                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                />
            </div>


            <div className='flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[1rem] w-full justify-between'>
                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                    <span className='text-[0.875rem] font-semibold'>City <span className='text-red-500'>*</span></span>
                    <Input
                        name="city"
                        value={formData.city}
                        required
                        onChange={handleChange}
                        placeholder='City'
                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>

                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                    <span className='text-[0.875rem] font-semibold'>ZIP / Postal code <span className='text-red-500'>*</span></span>
                    <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        placeholder='Postal code'
                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>
            </div>

            <Button type='submit' className='h-[2.5rem] md:max-w-[19rem] bg-[#AF52DE] mt-[1.5rem]' disabled={!isFormValid}>
                Add New Address
            </Button>
        </form>
    )
}
