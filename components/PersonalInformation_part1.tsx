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
import { isFormComplete, validateForm } from './checkout/checkoutValidation'
import { CheckoutPaymentFields, SavedAddressSelector } from './checkout/CheckoutFormFields'

type PersonalInformationProps = {
    readonly page: "member" | "guest"
    readonly cart: CartData
    readonly isBuyNow: boolean
    readonly processPayment?: (isProcessing: boolean) => void
    readonly onLocationIdChange?: (locationId: string | null) => void
};

export default function PersonalInformation(props: Readonly<PersonalInformationProps>) {
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

    useEffect(() => {
        setIsFormValid(isFormComplete(formData, page, deliveryType));
    }, [formData, deliveryType, page]);

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
                variation_sku: item.variation_sku,
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

            if (/^[^\s@]+@(?:[^\s@.]+\.)+[^\s@.]+$/.test(phone)) return prev;

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
            is_guest_order: page !== "member",
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

        if (!validateForm(formData, page, deliveryType)) {
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

    const redirectToOrderDetails = (order_id: string, data: MemberOrderPayload, page: string, delivery_id: string, fail = false, message = '', skipPayment = false) => {
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