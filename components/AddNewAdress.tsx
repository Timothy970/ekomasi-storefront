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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
    })

    useEffect(() => {
        if (profile) {
            setFormData((prev: FormData) => ({
                ...prev,
                email: profile.email ?? prev.email,
                firstName: profile.first_name ?? prev.firstName,
                lastName: profile.last_name ?? prev.lastName,
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

            <div className='flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[1rem] w-full justify-between'>
                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                    <span className='text-[0.875rem] font-semibold'>First name</span>
                    <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled
                        placeholder='First name*'
                        className='p-[0.5rem] h-[2rem] text-[0.875rem] border border-[rgba(0,0,0,0.40)] '
                    />
                </div>

                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                    <span className='text-[0.875rem]'>Last name</span>
                    <Input
                        value={formData.lastName}
                        name="lastName"
                        disabled
                        onChange={handleChange}
                        placeholder='Last name*'
                        className='p-[0.5rem] h-[2rem] border text-[0.875rem] border-[rgba(0,0,0,0.40)]'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Email address</span>

                <div className='relative'>
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                        <path d="M18 0.5H2C0.897 0.5 0 1.397 0 2.5V14.5C0 15.603 0.897 16.5 2 16.5H18C19.103 16.5 20 15.603 20 14.5V2.5C20 1.397 19.103 0.5 18 0.5ZM18 2.5V3.011L10 9.234L2 3.012V2.5H18ZM2 14.5V5.544L9.386 11.289C9.56111 11.4265 9.77733 11.5013 10 11.5013C10.2227 11.5013 10.4389 11.4265 10.614 11.289L18 5.544L18.002 14.5H2Z" fill="black" />
                    </svg>

                    <Input
                        name="email"
                        value={formData.email}
                        disabled
                        onChange={handleChange}
                        placeholder='Email Address*'
                        className='p-[0.5rem] h-[2rem] pl-10 pr-4 py-2 border text-[0.875rem] border-[rgba(0,0,0,0.40)] '
                    />
                </div>
            </div>

            <div className='flex flex-col gap-y-[0.5rem]'>
                <span className='text-[0.875rem] font-semibold'>Phone Number</span>

                <div className='relative'>
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
                        <path d="M12 0.5H2C0.897 0.5 0 1.397 0 2.5V18.5C0 19.603 0.897 20.5 2 20.5H12C13.103 20.5 14 19.603 14 18.5V2.5C14 1.397 13.103 0.5 12 0.5ZM2 15.499V3.5H12L12.002 15.499H2Z" fill="black" />
                    </svg>

                    <Input
                        name="phone"
                        value={formData.phone}
                        disabled
                        onChange={handleChange}
                        placeholder='254123456789*'
                        className='p-[0.5rem] h-[2rem] pl-10 pr-4 py-2 border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>
            </div>

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
                    className='p-[0.5rem] h-[2rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                    className='p-[0.5rem] h-[2rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                        className='p-[0.5rem] h-[2rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                        className='p-[0.5rem] h-[2rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                    />
                </div>
            </div>

            <Button type='submit' className='h-[2rem] md:max-w-[19rem] bg-[#AF52DE] mt-[1.5rem]'>
                Add new address
            </Button>
        </form>
    )
}
