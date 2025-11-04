"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import type { FormData } from '@/lib/features/types'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectUserProfile, selectUserToken } from '@/lib/features/user/userSlice'
import { createUserAddressAsync, getUserAddressAsync } from '@/lib/features/address/addressSlice'
import { Button } from './ui/button'
import CountrySelect from './CountrySelect'

type AddNewAddressProps = {
    addNewAdress: boolean;
    setAddNewAdress: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewAdress({ setAddNewAdress, addNewAdress }: AddNewAddressProps) {
    const profile = useAppSelector(selectUserProfile)
    const token = useAppSelector(selectUserToken)
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<FormData>({
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
    })

    useEffect(() => {
        if (profile) {
            setFormData((prev: FormData) => ({
                ...prev,
            }));
        }
    }, [profile, setFormData]);

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
        let addressFormDetails = addressPayload(formData)
        dispatch(createUserAddressAsync({ data: addressFormDetails, refetchAddress }))
        return
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const refetchAddress = () => {
        if (token) {
            dispatch(getUserAddressAsync())
            setAddNewAdress(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1.5rem] mt-[2rem] lg:mt-0 mb-[2rem] lg:mb-[2.5rem]'>
            <h2 className='text-[1.5rem] font-bold'>Add new Address</h2>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Country</span>
                <CountrySelect formData={formData} setFormData={setFormData} />
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Adress</span>
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
                <span className='text-[0.875rem] font-semibold'>Apartment, suite, etc.(optional)</span>
                <Input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    required
                    placeholder='Apartment, suite, etc.(optional)'
                    className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                />
            </div>

            <div className='flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[1rem] w-full justify-between'>
                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                    <span className='text-[0.875rem] font-semibold'>City</span>
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
                    <span className='text-[0.875rem] font-semibold'>ZIP / Postal code (optional)</span>
                    <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        placeholder='Postal code (optional)'
                        className='p-[0.5rem] h-[3rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>
            </div>

            <Button type='submit' className='h-[3rem] md:max-w-[19rem] bg-[#AF52DE] mt-[1.5rem]'>
                Add new address
            </Button>
        </form>
    )
}
