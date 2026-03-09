import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import LocationDropdown from './LocationDropdown'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { selectUserProfile, selectUserToken } from '@/lib/features/user/userSlice'
import CountrySelect from './CountrySelect'
import { CartData, FormData, MemberOrderPayload, OrderItem } from '@/lib/features/types'
import { clearCartState, createOrderAsync, selectPromocode, selectStatus } from '@/lib/features/cart/cartSlice'
import { useRouter } from 'next/navigation'
import { triggerToast } from '@/app/utils/toastUtils'
import LoadingIndicator from './LoadingIndicator'
import { getUserAddressAsync, selectAddress } from '@/lib/features/address/addressSlice'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowUpRight } from 'lucide-react'
import { useIsEditingAdress } from '@/app/ClientLayout'
import { getWarehousesAsync } from '@/lib/features/navigation/navigationSlice'
import WareHouseDropdown from './WareHouseDropdown'
import PaymentProcessingModal from './PaymentProcessingModal'

type PersonalInformationProps = {
    readonly page: "member" | "guest"
    readonly cart: CartData
    readonly isBuyNow: boolean
    readonly processPayment?: (isProcessing: boolean) => void
    readonly onLocationIdChange?: (locationId: string | null) => void
};

export default function PersonalInformation(props: PersonalInformationProps) {
    const { page, cart, isBuyNow, processPayment, onLocationIdChange } = props;
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        voucher: '',
        paymentMethod: 'mpesa',
        deliveryType: 'Ship',
        deliveryLocationId: "",
        promoApplied: false,
        paymentPhone: '',
    })
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const profile = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const status = useAppSelector(selectStatus)
    const token = useAppSelector(selectUserToken)
    const address = useAppSelector(selectAddress)
    const { isEditingAddress, setIsEditingAddress } = useIsEditingAdress()
    const promoCode = useAppSelector(selectPromocode)
    const [deliveryType, setDeliveryType] = useState<"ship" | "in store">("ship")
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [payingOrderId, setPayingOrderId] = useState<string | null>(null);
    const [deliveryId, setDeliveryId] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<MemberOrderPayload | null>(null);

    const getRequiredFields = (page: "member" | "guest", deliveryType: "ship" | "in store") => {
        const baseFields: { key: keyof FormData; label: string; requiredFor: ("member" | "guest")[] }[] = [
            { key: "firstName", label: "First Name", requiredFor: ["member", "guest"] },
            { key: "lastName", label: "Last Name", requiredFor: ["member", "guest"] },
            { key: "email", label: "Email", requiredFor: ["member", "guest"] },
            { key: "phone", label: "Phone Number", requiredFor: ["member", "guest"] },
            { key: "paymentPhone", label: "Payment Phone Number", requiredFor: ["member", "guest"] },
        ];

        if (deliveryType === "ship") {
            baseFields.push(
                { key: "deliveryLocationId", label: "Delivery Location", requiredFor: ["member", "guest"] },
                { key: "address", label: "Address", requiredFor: ["member", "guest"] },
                { key: "country", label: "Country", requiredFor: ["member", "guest"] },
                { key: "apartment", label: "Apartment", requiredFor: ["guest"] },
                { key: "city", label: "City", requiredFor: ["member", "guest"] }
            );
        }

        if (deliveryType === "in store") {
            baseFields.push({ key: "warehouse_id", label: "Pick Up Store", requiredFor: ["member", "guest"] });
        }

        return baseFields.filter(field => field.requiredFor.includes(page));
    };

    const isEmpty = (value: any) =>
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && value.trim() === "");

    const isFormComplete = (form: FormData): boolean => {
        const requiredFields = getRequiredFields(page, deliveryType);

        for (const { key } of requiredFields) {
            if (isEmpty(form[key])) return false;
        }

        if (isEmpty(form.email) && isEmpty(form.phone)) return false;

        return true;
    };

    const validateForm = (form: FormData, deliveryType: "ship" | "in store"): boolean => {
        const requiredFields = getRequiredFields(page, deliveryType);

        for (const { key, label } of requiredFields) {
            if (isEmpty(form[key])) {
                triggerToast(`${label} is required.`, "error");
                return false;
            }
        }

        if (isEmpty(form.email) && isEmpty(form.paymentPhone)) {
            triggerToast("Either Email or Phone Number is required.", "error");
            return false;
        }

        const phone = form.paymentPhone?.trim();
        if (phone) {
            if (!phone.startsWith("254")) {
                triggerToast("Phone number must start with 254.", "error");
                return false;
            }
            if (phone.length !== 12) {
                triggerToast("Phone number must be 12 digits long.", "error");
                return false;
            }
        }

        if (deliveryType === "in store" && isEmpty(form.warehouse_id)) {
            triggerToast("Please select a pick up store.", "error");
            return false;
        }
        return true;
    };

    useEffect(() => {
        setIsFormValid(isFormComplete(formData));
    }, [formData, deliveryType]);

    useEffect(() => {
        if (deliveryType === "in store") {
            onLocationIdChange?.(formData?.warehouse_id ?? null);
            return;
        }

        onLocationIdChange?.(null);
    }, [deliveryType, formData?.warehouse_id, onLocationIdChange]);

    useEffect(() => {
        if (token) {
            dispatch(getUserAddressAsync())
        }
    }, [token])

    useEffect(() => {
        if (profile) {
            setFormData((prev: FormData) => ({
                ...prev,
                email: profile.email ?? prev.email,
                firstName: profile.first_name ?? prev.firstName,
                lastName: profile.last_name ?? prev.lastName,
                phone: profile.phone ?? prev.phone,
                paymentPhone: profile.phone ?? prev.paymentPhone,
            }));
        }
    }, [profile, setFormData]);

    useEffect(() => {
        if (cart?.cart_items?.length) {
            const mappedItems: OrderItem[] = cart.cart_items.map((item) => ({
                product_id: item?.product.product_id,
                quantity: item.quantity,
            }));

            setOrderItems(mappedItems);
        }
    }, [cart]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneBlur = (name: string) => {
        setFormData((prev) => {
            let phone = prev[name as keyof FormData] as string;

            if (!phone) return prev;

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone)) return prev;

            phone = phone.trim().replace(/\D/g, "");

            if (phone.startsWith("0")) {
                phone = phone.substring(1);
            }

            if (phone && !phone.startsWith("254")) {
                phone = "254" + phone;
            }

            if (phone.length > 12) {
                phone = phone.slice(0, 12);
            }

            return { ...prev, [name]: phone };
        });
    };

    useEffect(() => {
        setFormData((prev) => {
            const currentPhone = prev?.paymentPhone ?? "";
            let phone = currentPhone.trim().replace(/\D/g, "");

            if (!phone.startsWith("254")) {
                phone = "254" + phone.replace(/^0+/, "");
            }

            return { ...prev, paymentPhone: phone };
        });
    }, [profile]);

    useEffect(() => {
        if (address && address.length > 0) {
            const first = address[0];

            setFormData((prev) => ({
                ...prev,
                address: first.address ?? "",
                apartment: first.apartment ?? "",
                city: first.city ?? "",
                country: first.country ?? "",
                postalCode: first.zip_code ?? "",
            }));
        }
    }, [address]);

    useEffect(() => {
        setIsEditingAddress(false);
    }, [])

    useEffect(() => {
        dispatch(getWarehousesAsync());
    }, [dispatch]);

    const handleEditAddressClick = () => {
        setIsEditingAddress(true);
        router.push("/dashboard/address");
    };

    const orderPayload = (formData: FormData) => {
        let payload = {
            is_guest_order: page === "member" ? false : true,
            guest_delivery_address: {
                street: formData?.address,
                apartment: formData?.apartment,
                city: formData?.city,
                state: "",
                postal_code: formData?.postalCode,
                country: formData?.country,
            },
            guest_personal_details: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
            },
            order_items: orderItems ?? [],
            location_id: formData?.deliveryLocationId ?? "",
            store_id: formData?.warehouse_id ?? "",
            promo_code: promoCode,
        } as any;

        if (deliveryType === "ship") {
            delete payload.store_id;
        }

        if (deliveryType === "in store") {
            delete payload.location_id;
        }

        return payload
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditingAddress) {
            return;
        }

        if (!validateForm(formData, deliveryType)) {
            return;
        }

        let personalFormDetails = orderPayload(formData)

        if (cart) {
            let extraPaymentPayload = {
                phone: formData?.paymentPhone ?? "",
            }

            if (personalFormDetails?.order_items?.length) {
                await dispatch(createOrderAsync(
                    {
                        data: personalFormDetails,
                        page,
                        redirectToOrderDetails,
                        extraPaymentPayload,
                        triggerToast
                    }
                ))
            }
        }
    };

    const redirectToOrderDetails = (order_id: string, data: MemberOrderPayload, page: string, fail = false, message = '', delivery_id: string, skipPayment = false) => {
        if (skipPayment) {
            triggerToast("Order placed successfully!", "success");
            dispatch(clearCartState());
            if (page === "member") {
                router.push(`/dashboard/orders/${order_id}`)
            } else if (page === "guest") {
                router.push(`/guest/orders/${order_id}/${data?.guest_personal_details?.email}/${data?.guest_personal_details?.phone}`)
            }
            return;
        }

        if (!fail) {
            processPayment?.(true);
            setDeliveryId(delivery_id);
            setPayingOrderId(order_id);
            setIsPaymentModalOpen(true);
            setOrderData(data);
            triggerToast("Order placed successfully and Payment request initiated successfully!", "success");
        } else {
            triggerToast(`${message}`, "success");
        }
    }

    const handlePaymentConfirmed = async () => {
        await dispatch(clearCartState());
        if (page === "member") {
            router.push(`/dashboard/orders/${payingOrderId}`)
        } else if (page === "guest") {
            router.push(`/guest/orders/${payingOrderId}/${orderData?.guest_personal_details.email}/${orderData?.guest_personal_details?.phone}`)
        }
        setIsPaymentModalOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1.5rem] mt-[2rem] lg:mt-0 mb-[2rem] lg:mb-[2.5rem]'>
                <h2 className='text-[1.5rem] font-bold'>Personal Information</h2>

                {
                    !profile?.first_name || !profile?.last_name ? <div className='flex flex-col gap-y-[1rem] md:gap-y-0 md:flex-row gap-x-[1rem] w-full justify-between'>
                        {
                            !profile?.first_name && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                <span className='text-[0.875rem] font-semibold'>First name</span>
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder='First name*'
                                    className='p-[0.5rem] h-[2.5rem] text-[0.875rem] border border-[rgba(0,0,0,0.40)] '
                                />
                            </div>
                        }

                        {
                            !profile?.last_name && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                <span className='text-[0.875rem]'>Last name</span>
                                <Input
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder='Last name*'
                                    className='p-[0.5rem] h-[2.5rem] border text-[0.875rem] border-[rgba(0,0,0,0.40)]'
                                />
                            </div>
                        }
                    </div> : <></>
                }

                {
                    ((profile?.phone && profile?.email) || !profile?.email) && <div className='flex flex-col gap-y-[0.5rem]'>
                        <span className='text-[0.875rem] font-semibold'>Email address</span>

                        <div className='relative'>
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                                <path d="M18 0.5H2C0.897 0.5 0 1.397 0 2.5V14.5C0 15.603 0.897 16.5 2 16.5H18C19.103 16.5 20 15.603 20 14.5V2.5C20 1.397 19.103 0.5 18 0.5ZM18 2.5V3.011L10 9.234L2 3.012V2.5H18ZM2 14.5V5.544L9.386 11.289C9.56111 11.4265 9.77733 11.5013 10 11.5013C10.2227 11.5013 10.4389 11.4265 10.614 11.289L18 5.544L18.002 14.5H2Z" fill="black" />
                            </svg>

                            <Input
                                name="email"
                                value={formData.email}
                                required
                                disabled={!!profile?.email}
                                onChange={handleChange}
                                placeholder='Email Address*'
                                className='p-[0.5rem] h-[2.5rem] pl-10 pr-4 py-2 border text-[0.875rem] border-[rgba(0,0,0,0.40)] '
                            />
                        </div>
                    </div>
                }

                {

                    ((profile?.phone && profile?.email) || !profile?.phone) && <div className='flex flex-col gap-y-[0.5rem]'>
                        <span className='text-[0.875rem] font-semibold'>Phone Number</span>

                        <div className='relative'>
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
                                <path d="M12 0.5H2C0.897 0.5 0 1.397 0 2.5V18.5C0 19.603 0.897 20.5 2 20.5H12C13.103 20.5 14 19.603 14 18.5V2.5C14 1.397 13.103 0.5 12 0.5ZM2 15.499V3.5H12L12.002 15.499H2Z" fill="black" />
                            </svg>

                            <Input
                                name="phone"
                                value={formData.phone}
                                disabled={!!profile?.phone}
                                required
                                onBlur={() => handlePhoneBlur("phone")}
                                onChange={handleChange}
                                placeholder='254123456789*'
                                className='p-[0.5rem] h-[2.5rem] pl-10 pr-4 py-2 border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                            />
                        </div>
                    </div>
                }

                <div className='flex flex-col gap-y-[1.5rem]'>
                    <p className='font-bold text-[1.5rem]'>Delivery</p>

                    <div className='flex flex-row gap-x-[1rem] w-full justify-start'>
                        <Button type='button' onClick={() => setDeliveryType("ship")} className={`px-[3rem] min-w-[10rem] h-[2.5rem] border ${deliveryType === "ship" ? 'bg-[#AF52DE36]' : 'bg-white'} border-[#AF52DE] text-custom-black `}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="22"
                                viewBox="0 0 24 22"
                                fill="none"
                            >
                                <path
                                    d="M16 15V2H1V15H16ZM16 15H23V10L20 7H16V15ZM8 17.5C8 18.8807 6.88071 20 5.5 20C4.11929 20 3 18.8807 3 17.5C3 16.1193 4.11929 15 5.5 15C6.88071 15 8 16.1193 8 17.5ZM21 17.5C21 18.8807 19.8807 20 18.5 20C17.1193 20 16 18.8807 16 17.5C16 16.1193 17.1193 15 18.5 15C19.8807 15 21 16.1193 21 17.5Z"
                                    stroke="#1E1E1E"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Ship</span>
                        </Button>

                        <Button type='button' onClick={() => setDeliveryType("in store")} className={`px-[3rem] min-w-[10rem] h-[2.5rem] ${deliveryType === "in store" ? 'bg-[#AF52DE36]' : 'bg-white'} border border-black text-custom-black`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-store-icon lucide-store"
                            >
                                <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
                                <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
                                <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
                            </svg>
                            <span>In Store</span>
                        </Button>
                    </div>
                    {deliveryType === "ship" && (
                        <>
                            {address && address.length > 0 ? (
                                <div className="flex flex-col gap-y-[0.5rem]">
                                    <span className="text-[0.875rem] font-semibold">Saved Address</span>

                                    <div className='flex gap-x-[0.5rem]'>
                                        <Select
                                            defaultValue={address[0].address_id}
                                            onValueChange={(value) => {
                                                const selected = address.find((a) => a.address_id === value);
                                                if (selected) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        address: selected.address ?? "",
                                                        apartment: selected.apartment ?? "",
                                                        city: selected.city ?? "",
                                                        country: selected.country ?? "",
                                                        postalCode: selected.zip_code ?? "",
                                                    }));
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="w-full h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]">
                                                <SelectValue placeholder="Choose an address" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {address.map((addr) => (
                                                    <SelectItem key={addr.address_id} value={addr.address_id}>
                                                        {addr.address}, {addr.city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            onClick={handleEditAddressClick}
                                            className="bg-[#AF52DE] text-[0.75rem] h-[2.5rem] hover:bg-[#AF52DE]"
                                        >
                                            <ArrowUpRight />
                                            <span>Edit Address</span>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {
                                        token && <div className="flex items-center justify-between">
                                            <p className="text-[0.875rem] text-gray-600">No saved addresses found.</p>

                                            <Button
                                                onClick={() => router.push("/dashboard/address")}
                                                className="bg-[#AF52DE] text-[0.75rem] h-[2.5rem] hover:bg-[#AF52DE]"
                                            >
                                                <ArrowUpRight />
                                                <span>Add Address</span>
                                            </Button>
                                        </div>
                                    }
                                </>
                            )}

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
                                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                />
                            </div>

                            <div className='flex flex-col gap-y-[0.5rem]'>
                                <span className='text-[0.875rem] font-semibold'>Apartment, suite, etc.(optional)</span>
                                <Input
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    placeholder='Apartment, suite, etc.(optional)'
                                    className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
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
                                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                    />
                                </div>

                                <div className='flex flex-col gap-y-[0.5rem] w-full'>
                                    <span className='text-[0.875rem] font-semibold'>ZIP / Postal code (optional)</span>
                                    <Input
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder='Postal code (optional)'
                                        className='p-[0.5rem] h-[2.5rem] border border-[rgba(0,0,0,0.40)] text-[0.875rem]'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {
                        deliveryType === "ship" && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                            <span className='text-[0.875rem] font-semibold'>Shipping price</span>
                            <LocationDropdown
                                isBuyNow={isBuyNow}
                                setFormData={setFormData}
                            />
                        </div>
                    }

                    {
                        deliveryType === "in store" && <div className='flex flex-col gap-y-[0.5rem] w-full'>
                            <span className='text-[0.875rem] font-semibold'>Select pick up store</span>
                            <WareHouseDropdown setFormData={setFormData} />
                        </div>
                    }

                    <div className='flex flex-col gap-y-[1.5rem]'>
                        <h2 className='font-bold text-[1.5rem]'>Payment</h2>
                        <p className='text-[0.875rem]'>Please select your preferred payment option</p>
                        {/* {
                        token && <>
                            <div className='flex gap-x-[0.5rem] items-center'>
                                <Checkbox disabled className='h-[1.125rem] w-[1.125rem]' />
                                <p className='text-[0.875rem]'>Do you have a gift card, product voucher, or promo code?</p>
                            </div>

                            <div className='flex gap-x-[2rem]'>
                                <Input className='h-[2.5rem] border-[rgba(0,0,0,0.40)] text-[0.875rem] ' />
                                <Button disabled className='border h-[2.5rem] bg-white text-custom-black border-[rgba(0,0,0,0.40)]'>
                                    Apply
                                </Button>
                            </div>
                        </>
                    } */}

                        <RadioGroup defaultValue="mpesa" className="flex flex-col gap-y-[1rem]">
                            {/* <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                                <RadioGroupItem value="card" id="card" disabled />
                                <Label htmlFor="card">Credit or Debit Card</Label>
                            </div>

                            <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                                <RadioGroupItem value="paypal" id="paypal" disabled />
                                <Label htmlFor="paypal">Paypal</Label>
                            </div> */}

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mpesa" id="mpesa" checked />
                                <Label htmlFor="mpesa">Mpesa</Label>
                            </div>

                            {/* <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                                <RadioGroupItem value="airtel" id="airtel" disabled />
                                <Label htmlFor="airtel">Airtel</Label>
                            </div> */}
                        </RadioGroup>

                        <div className='flex flex-col gap-y-[1.5rem]'>
                            <Input
                                name="paymentPhone"
                                value={formData.paymentPhone}
                                onChange={handleChange}
                                onBlur={() => handlePhoneBlur("paymentPhone")}
                                placeholder='254123456789'
                                className='p-[0.5rem] h-[2.5rem] border-[rgba(0,0,0,0.40)] border text-[0.875rem] '
                            />

                            <Button
                                disabled={status == "loading"}
                                type='submit'
                                onClick={() => {
                                    if (!isFormValid) {
                                        triggerToast("Please fill out all required fields before continuing.", "error");
                                        return;
                                    }
                                }}
                                className={`h-[2.5rem] md:max-w-[19rem] bg-[#AF52DE] ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {
                                    status == "loading" && <LoadingIndicator textColor="text-white" />
                                }
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <PaymentProcessingModal
                isOpen={isPaymentModalOpen}
                orderId={payingOrderId}
                deliveryId={deliveryId}
                onPaymentConfirmed={handlePaymentConfirmed}
                onPaymentFailed={() => setIsPaymentModalOpen(false)}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </>
    )
}
