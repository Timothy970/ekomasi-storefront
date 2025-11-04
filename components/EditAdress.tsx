"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import type { FormData, MyAddress } from '@/lib/features/types'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserProfile } from '@/lib/features/user/userSlice'
import { getUserAddressAsync, updateUserAddressAsync } from '@/lib/features/address/addressSlice'
import { Button } from './ui/button'
import CountrySelect from './CountrySelect'
import { triggerToast } from '@/app/utils/toastUtils'

type AddNewAddressProps = {
    setEditAdress: React.Dispatch<React.SetStateAction<boolean>>;
    editAdressDetails: MyAddress;
};

export default function EditAdress({ setEditAdress, editAdressDetails }: AddNewAddressProps) {
    const profile = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch()
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: profile?.first_name ?? "",
        lastName: profile?.last_name ?? "",
        email: profile?.email ?? "",
        phone: "",
        address: editAdressDetails?.address ?? "",
        apartment: editAdressDetails?.apartment ?? "",
        city: editAdressDetails?.city ?? "",
        country: editAdressDetails?.country ?? "",
        postalCode: editAdressDetails?.zip_code ?? "",
    })

    const REQUIRED_FIELDS: { key: keyof FormData; label: string }[] = [
        { key: "country", label: "Country" },
        { key: "address", label: "Address" },
        { key: "apartment", label: "Apartment, suite, etc." },
        { key: "city", label: "City" },
        { key: "postalCode", label: "Postal Code" },
    ];

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

    useEffect(() => {
        setIsFormValid(isFormComplete(formData));
    }, [formData]);

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
        setFormData((prev: FormData) => ({
            ...prev,
            apartment: editAdressDetails?.apartment ?? "",
            address: editAdressDetails?.address ?? "",
            city: editAdressDetails?.city ?? "",
            country: editAdressDetails?.country ?? "",
            postalCode: editAdressDetails?.zip_code ?? "",
        }));
    }, [editAdressDetails]);

    const addressPayload = (formData: FormData) => {
        return {
            address: formData?.address,
            apartment: formData.apartment,
            city: formData?.city,
            country: formData?.country ? formData?.country : "",
            zip_code: formData?.postalCode,
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm(formData)) return;

        let addressFormDetails = addressPayload(formData);
        dispatch(updateUserAddressAsync({ data: addressFormDetails, refetchAddress, address_id: editAdressDetails?.address_id }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const refetchAddress = (status: string) => {
        if (status === 'success') {
            triggerToast("Address updated successfully!", "success");
        } else {
            triggerToast("Address update failed!", "error");
        }

        dispatch(getUserAddressAsync());
        setEditAdress(false);
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1.5rem] mt-[2rem] lg:mt-0 mb-[2rem] lg:mb-[2.5rem]'>
            <h2 className='text-[1.5rem] font-bold'>Edit Address</h2>

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
                    className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                />
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Apartment, suite, etc.<span className='text-red-500'> *</span></span>
                <Input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    required
                    placeholder='Apartment, suite, etc.'
                    className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                        className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                        className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>
            </div>

            <Button disabled={!isFormValid} type='submit' className='h-[3rem] md:max-w-[19rem] bg-[#AF52DE] mt-[1.5rem]'>
                Update address
            </Button>
        </form>
    )
}
