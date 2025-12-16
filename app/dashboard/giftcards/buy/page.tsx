"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createVoucherAsync, getVoucherDesignsAsync, selectDesigns } from '@/lib/voucher/voucherSlice'
import { triggerToast } from '@/app/utils/toastUtils'
import { CreateVoucherPayload } from '@/lib/features/types'
import NextImage from '@/components/NextImage'
import { useVoucher } from '@/app/ClientLayout'
import SuccessModal from '@/components/SuccessModal'
import { ToastType } from '@/lib/features/toast/toastSlice'

export default function BuyGiftCards() {
    const [voucherType, setSelectVoucherType] = useState('');
    const [discount, setDiscount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const voucherDesigns = useAppSelector(selectDesigns);
    const [designImage, setDesignImage] = useState("")
    const voucherAmounts = [500, 1500, 2500, 3500, 4500, 5500, "Custom"];
    const [selectedAmount, setSelectedAmount] = useState<number | string>("");
    const [customAmount, setCustomAmount] = useState("");
    const { setVoucherSuccessModalOpen } = useVoucher();

    const REQUIRED_USER_FIELDS: { key: keyof CreateVoucherPayload; label: string }[] = [
        { key: "design_id", label: "Design" },
        { key: "amount", label: "Amount" },
        { key: "to_name", label: "Recipient Name" },
        { key: "to_email", label: "Recipient Email" },
        { key: "from_name", label: "Sender Name" },
        { key: "delivery_time", label: "Delivery Time" },
        { key: "message", label: "Message" },
        { key: "phone_number", label: "Phone Number" },
    ];

    function validateRoleBeforeSave(user: CreateVoucherPayload): boolean {
        let isValid = true;

        for (const { key, label } of REQUIRED_USER_FIELDS) {
            const value = user[key];

            if (
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === "string" && value.trim() === "")
            ) {
                triggerToast(`${label} is required.`, "error");
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("status", "active");
        dispatch(getVoucherDesignsAsync(params.toString()));
    }, [dispatch]);

    useEffect(() => {
        if (voucherDesigns?.length > 0) {
            setDesignImage(voucherDesigns[0]?.url)
        }
    }, [voucherDesigns])

    useEffect(() => {
        const amount =
            selectedAmount === "Custom"
                ? Number(customAmount)
                : Number(selectedAmount);

        setDiscount(amount.toString());
    }, [selectedAmount, customAmount]);

    const handleVoucherPurchase = (message: string, type: ToastType): void => {
        if (type === "success") {
            setVoucherSuccessModalOpen(true)
        } else {
            setVoucherSuccessModalOpen(false)
            triggerToast(message, type);
        }
    }

    const validateAmount = (): boolean => {
        const minAmount = voucherAmounts[0];

        let amountToCheck: number;

        if (selectedAmount === "Custom") {
            if (!customAmount || isNaN(Number(customAmount)) || Number(customAmount) <= 0) {
                triggerToast("Please enter a valid custom amount.", "error");
                return false;
            }

            amountToCheck = Number(customAmount);
        } else {
            amountToCheck = Number(selectedAmount);
        }

        if (typeof minAmount === "number" && typeof amountToCheck === "number") {
            if (amountToCheck < minAmount) {
                triggerToast(`Amount must be greater than ${minAmount}.`, "error");
                return false;
            }
        } else {
            triggerToast("Invalid amount values.", "error");
            return false;
        }

        return true;
    };

    const normalizePhoneTo254 = (phone: string) => {
        const cleaned = phone.replace(/\D/g, "");

        if (cleaned.startsWith("0") && cleaned.length === 10) {
            return "254" + cleaned.slice(1);
        }

        if (cleaned.startsWith("254") && cleaned.length === 12) {
            return cleaned;
        }

        return cleaned;
    };

    const normalizePhoneForSave = (phone: string) => {
        let val = phone.trim();
        if (val.startsWith("0")) {
            val = "254" + val.slice(1);
        }
        return val.replace(/\s+/g, "");
    };

    const isValidKenyanPhone = (phone: string) => {
        const regex = /^254\d{9}$/;
        return regex.test(phone);
    }

    const handleCreate = async () => {
        if (!validateAmount()) return;

        const normalizedPhone = normalizePhoneForSave(phone);

        if (!isValidKenyanPhone(normalizedPhone)) {
            triggerToast("Please enter a valid Kenyan phone number starting with 0 or 254.", "error")
            return
        }

        const payload: CreateVoucherPayload = {
            design_id: voucherType,
            amount: Number.parseInt(discount, 10),
            to_name: recipientName,
            to_email: recipientEmail,
            from_name: senderName,
            delivery_time: deliveryDate,
            message: message,
            phone_number: normalizedPhone,
            payment_method: "mpesa",
        };

        if (!validateRoleBeforeSave(payload)) return;

        if (payload) {
            await dispatch(createVoucherAsync({ payload, handleVoucherPurchase }));
        } else {
            triggerToast('Please fill in the form!', 'error');
        }
    };

    return (
        <Navigation>
            <DashboardLayout>
                <div className='relative z-[12] w-full h-full flex flex-col gap-y-[1.5rem] p-[2rem] shadow-md rounded-[1.25rem]'>
                    <svg className='absolute left-[7rem] top-[3rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="70" height="44" viewBox="0 0 70 44" fill="none">
                        <path d="M14.1428 41.3623C14.5382 41.3536 15.0227 41.3404 15.5865 41.3207C17.2985 41.2609 19.7401 41.1405 22.6451 40.8956C28.4674 40.4048 36.0973 39.4202 43.4293 37.4569C50.8081 35.4811 57.6454 32.5753 62.0948 28.387C64.2949 26.3161 65.8782 23.9631 66.6909 21.2741C67.5016 18.5915 67.5843 15.4474 66.5911 11.7263C65.3152 6.94596 62.9505 4.18069 60.2368 2.58181C57.4639 0.948069 54.1238 0.415593 50.7618 0.506712C47.4098 0.597592 44.1818 1.30429 41.7671 2.00391C40.5663 2.35183 39.5817 2.69351 38.9026 2.94589C38.5634 3.07193 38.3011 3.17539 38.1272 3.24587C38.0406 3.28097 37.976 3.30796 37.9348 3.32532C37.9141 3.334 37.8985 3.34078 37.8899 3.3445C37.886 3.34615 37.8835 3.34742 37.8822 3.34798L37.8814 3.34749L35.4006 4.42757L35.0972 1.74007L35.0977 1.73922C35.0976 1.73783 35.0971 1.73421 35.0965 1.72953L35.0628 1.47549C35.037 1.28961 34.9964 1.01054 34.9362 0.653673C34.8157 -0.0607892 34.6194 -1.08436 34.3211 -2.29843C33.7212 -4.73964 32.7219 -7.88854 31.1261 -10.8367C29.5253 -13.794 27.3942 -16.4201 24.5923 -18.0043C21.8501 -19.5547 18.2704 -20.2201 13.487 -18.9334C10.1931 -18.0474 7.81639 -16.5065 6.10617 -14.5401C4.38399 -12.5598 3.25128 -10.0465 2.61881 -7.09942C1.34183 -1.14859 2.16438 6.28737 3.95563 13.7297C5.736 21.1267 8.4183 28.3132 10.6674 33.669C11.7899 36.3421 12.8001 38.5487 13.5279 40.0837C13.7649 40.5837 13.9717 41.0123 14.1428 41.3623Z" stroke="#ADD1CB" strokeWidth="4" />
                    </svg>

                    <svg className='absolute left-[6rem] top-[11rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="48" height="45" viewBox="0 0 48 45" fill="none">
                        <path d="M13.3949 44.3415C13.3949 44.3415 55.1783 36.1901 46.1539 15.7241C40.2926 2.4317 24.6729 13.2577 24.6729 13.2577C24.6729 13.2577 19.6418 -5.07165 6.6082 1.37586C-11.5193 10.3432 13.3949 44.3415 13.3949 44.3415Z" fill="#ADCEC7" fillOpacity="0.4" />
                    </svg>

                    <svg className='absolute left-[6rem] bottom-[11rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36" fill="none">
                        <path d="M13.3949 44.3415C13.3949 44.3415 55.1783 36.1901 46.1539 15.7241C40.2926 2.4317 24.6729 13.2577 24.6729 13.2577C24.6729 13.2577 19.6418 -5.07165 6.6082 1.37586C-11.5193 10.3432 13.3949 44.3415 13.3949 44.3415Z" fill="#ADCEC7" fillOpacity="0.4" />
                    </svg>

                    <svg className='absolute right-[6rem] bottom-[11rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="175" height="108" viewBox="0 0 175 108" fill="none">
                        <path d="M142.35 159.946C142.74 159.192 143.31 158.08 144.023 156.649L144.915 157.093C146.068 154.78 147.595 151.64 149.349 147.835L148.443 147.417C149.72 144.645 151.119 141.519 152.583 138.105L153.501 138.5C154.764 135.553 156.074 132.391 157.397 129.057L156.471 128.689C157.675 125.653 158.889 122.473 160.086 119.18L161.025 119.522C162.163 116.391 163.284 113.158 164.367 109.85L163.417 109.538C164.458 106.359 165.462 103.11 166.409 99.8163L167.368 100.092C168.302 96.8376 169.183 93.5382 169.986 90.2164L169.987 90.2159L169.015 89.9801C169.813 86.6808 170.535 83.3611 171.162 80.0434L172.143 80.2297C172.78 76.857 173.319 73.4848 173.741 70.1365L172.752 70.0115C173.18 66.614 173.485 63.2441 173.646 59.9268L174.643 59.9756C174.811 56.5039 174.824 53.0859 174.656 49.7492L173.658 49.7996C173.485 46.3621 173.117 43.0177 172.53 39.7976L173.512 39.6184C172.887 36.19 172.014 32.8938 170.864 29.7652L169.928 30.1091C168.759 26.9322 167.3 23.9399 165.519 21.1682L166.36 20.6293C164.536 17.7898 162.377 15.1716 159.848 12.8136L159.166 13.5428C156.822 11.357 154.149 9.39806 151.114 7.7008L151.601 6.83008C148.797 5.26194 145.696 3.91447 142.273 2.81342L141.967 3.7632C140.793 3.3853 139.578 3.03744 138.323 2.7191L137.055 2.41014C135.485 2.04519 133.959 1.75512 132.477 1.53513L132.623 0.548965C129.269 0.0512437 126.123 -0.0938357 123.17 0.0649833L123.223 1.05923C119.957 1.23494 116.941 1.79288 114.156 2.6643L113.859 1.71262C110.743 2.68782 107.9 4.04571 105.307 5.70174L105.845 6.54274C103.228 8.21409 100.867 10.1998 98.7384 12.4099L98.0187 11.718C95.8229 13.9976 93.874 16.5034 92.1455 19.1365L92.981 19.6838C91.2617 22.3029 89.761 25.0554 88.4519 27.8402L87.5473 27.4165C86.1654 30.3565 84.9976 33.3255 84.0128 36.2075L84.958 36.53C83.8783 39.6899 83.0201 42.7461 82.3408 45.5413L81.3709 45.3066C80.4826 48.9618 79.8975 52.1703 79.5246 54.5879L80.5117 54.7393C80.2885 56.1862 80.1422 57.3452 80.0515 58.1402C80.0062 58.5376 79.9754 58.8444 79.9555 59.0502C79.9456 59.1531 79.938 59.2311 79.9334 59.2825C79.9312 59.308 79.9297 59.3272 79.9287 59.3396C79.9282 59.3456 79.928 59.35 79.9277 59.3528C79.9276 59.354 79.9272 59.3549 79.9271 59.3555L79.9276 59.3563L79.8181 60.7027L78.5627 60.2052L78.5618 60.2058C78.5613 60.2056 78.5607 60.2043 78.5594 60.2038C78.5568 60.2028 78.5521 60.2016 78.5463 60.1993C78.5347 60.1948 78.5169 60.1876 78.493 60.1784C78.4449 60.1598 78.3722 60.1317 78.2756 60.0953C78.0821 60.0222 77.7933 59.9149 77.4166 59.78C76.6631 59.5102 75.5583 59.1297 74.1612 58.6908L74.4607 57.7381C72.1264 57.0047 68.9886 56.112 65.3161 55.2947L65.0997 56.2682C62.2912 55.6432 59.1689 55.064 55.8562 54.6377L55.9837 53.6471C52.9622 53.2583 49.7818 52.9958 46.533 52.9383L46.5151 53.9366C43.4379 53.8822 40.3049 54.0148 37.1954 54.4025L37.072 53.4117C33.9459 53.8016 30.8372 54.4462 27.8224 55.4125L28.1275 56.3625C25.2049 57.2991 22.3808 58.5431 19.7266 60.1563L19.2072 59.304C16.5786 60.9017 14.1071 62.8556 11.8581 65.2246L12.582 65.9104C10.5727 68.0268 8.74311 70.489 7.14535 73.3446L6.27484 72.8594C4.83087 75.4404 3.57273 78.3291 2.54023 81.5599L3.49146 81.8626C3.03512 83.2904 2.62284 84.788 2.2578 86.3583L2.11706 86.9821C1.79782 88.4339 1.54947 89.8554 1.36884 91.2469L0.377778 91.1186C-0.0765798 94.619 -0.11267 97.9454 0.228122 101.107L1.22163 100.999C1.58048 104.328 2.36773 107.468 3.53271 110.429L2.60328 110.795C3.82519 113.901 5.45082 116.818 7.42516 119.556L8.2359 118.971C10.1031 121.561 12.2941 123.994 14.7628 126.28L14.0841 127.013C16.4724 129.225 19.1094 131.296 21.9522 133.234L22.5158 132.408C25.1727 134.219 28.0157 135.916 31.0092 137.506L30.5412 138.387C33.4368 139.925 36.4672 141.361 39.6004 142.701L39.9931 141.784C42.9994 143.07 46.1034 144.27 49.2757 145.387L48.9449 146.328C52.0752 147.431 55.2687 148.456 58.4993 149.406L58.7805 148.446C61.9665 149.382 65.1895 150.247 68.4221 151.045L68.1826 152.014C71.4439 152.819 74.7136 153.557 77.965 154.233L78.1685 153.253C81.4707 153.939 84.7545 154.56 87.9907 155.124L87.8184 156.109C91.1864 156.696 94.5028 157.218 97.7345 157.686L97.8776 156.698C101.289 157.192 104.607 157.623 107.793 157.999L107.676 158.99C111.172 159.403 114.508 159.752 117.635 160.043L117.729 159.047C121.365 159.386 124.717 159.65 127.706 159.855L127.637 160.853C131.747 161.135 135.172 161.304 137.706 161.408L137.746 160.41C139.317 160.475 140.544 160.513 141.376 160.535C141.633 160.541 141.853 160.546 142.034 160.55C142.12 160.385 142.227 160.183 142.35 159.946Z" stroke="#A5CECA" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>

                    <svg className='absolute left-[6rem] top-1/2 -translate-y-1/2 z-[9]' xmlns="http://www.w3.org/2000/svg" width="175" height="108" viewBox="0 0 175 108" fill="none">
                        <path d="M142.35 159.946C142.74 159.192 143.31 158.08 144.023 156.649L144.915 157.093C146.068 154.78 147.595 151.64 149.349 147.835L148.443 147.417C149.72 144.645 151.119 141.519 152.583 138.105L153.501 138.5C154.764 135.553 156.074 132.391 157.397 129.057L156.471 128.689C157.675 125.653 158.889 122.473 160.086 119.18L161.025 119.522C162.163 116.391 163.284 113.158 164.367 109.85L163.417 109.538C164.458 106.359 165.462 103.11 166.409 99.8163L167.368 100.092C168.302 96.8376 169.183 93.5382 169.986 90.2164L169.987 90.2159L169.015 89.9801C169.813 86.6808 170.535 83.3611 171.162 80.0434L172.143 80.2297C172.78 76.857 173.319 73.4848 173.741 70.1365L172.752 70.0115C173.18 66.614 173.485 63.2441 173.646 59.9268L174.643 59.9756C174.811 56.5039 174.824 53.0859 174.656 49.7492L173.658 49.7996C173.485 46.3621 173.117 43.0177 172.53 39.7976L173.512 39.6184C172.887 36.19 172.014 32.8938 170.864 29.7652L169.928 30.1091C168.759 26.9322 167.3 23.9399 165.519 21.1682L166.36 20.6293C164.536 17.7898 162.377 15.1716 159.848 12.8136L159.166 13.5428C156.822 11.357 154.149 9.39806 151.114 7.7008L151.601 6.83008C148.797 5.26194 145.696 3.91447 142.273 2.81342L141.967 3.7632C140.793 3.3853 139.578 3.03744 138.323 2.7191L137.055 2.41014C135.485 2.04519 133.959 1.75512 132.477 1.53513L132.623 0.548965C129.269 0.0512437 126.123 -0.0938357 123.17 0.0649833L123.223 1.05923C119.957 1.23494 116.941 1.79288 114.156 2.6643L113.859 1.71262C110.743 2.68782 107.9 4.04571 105.307 5.70174L105.845 6.54274C103.228 8.21409 100.867 10.1998 98.7384 12.4099L98.0187 11.718C95.8229 13.9976 93.874 16.5034 92.1455 19.1365L92.981 19.6838C91.2617 22.3029 89.761 25.0554 88.4519 27.8402L87.5473 27.4165C86.1654 30.3565 84.9976 33.3255 84.0128 36.2075L84.958 36.53C83.8783 39.6899 83.0201 42.7461 82.3408 45.5413L81.3709 45.3066C80.4826 48.9618 79.8975 52.1703 79.5246 54.5879L80.5117 54.7393C80.2885 56.1862 80.1422 57.3452 80.0515 58.1402C80.0062 58.5376 79.9754 58.8444 79.9555 59.0502C79.9456 59.1531 79.938 59.2311 79.9334 59.2825C79.9312 59.308 79.9297 59.3272 79.9287 59.3396C79.9282 59.3456 79.928 59.35 79.9277 59.3528C79.9276 59.354 79.9272 59.3549 79.9271 59.3555L79.9276 59.3563L79.8181 60.7027L78.5627 60.2052L78.5618 60.2058C78.5613 60.2056 78.5607 60.2043 78.5594 60.2038C78.5568 60.2028 78.5521 60.2016 78.5463 60.1993C78.5347 60.1948 78.5169 60.1876 78.493 60.1784C78.4449 60.1598 78.3722 60.1317 78.2756 60.0953C78.0821 60.0222 77.7933 59.9149 77.4166 59.78C76.6631 59.5102 75.5583 59.1297 74.1612 58.6908L74.4607 57.7381C72.1264 57.0047 68.9886 56.112 65.3161 55.2947L65.0997 56.2682C62.2912 55.6432 59.1689 55.064 55.8562 54.6377L55.9837 53.6471C52.9622 53.2583 49.7818 52.9958 46.533 52.9383L46.5151 53.9366C43.4379 53.8822 40.3049 54.0148 37.1954 54.4025L37.072 53.4117C33.9459 53.8016 30.8372 54.4462 27.8224 55.4125L28.1275 56.3625C25.2049 57.2991 22.3808 58.5431 19.7266 60.1563L19.2072 59.304C16.5786 60.9017 14.1071 62.8556 11.8581 65.2246L12.582 65.9104C10.5727 68.0268 8.74311 70.489 7.14535 73.3446L6.27484 72.8594C4.83087 75.4404 3.57273 78.3291 2.54023 81.5599L3.49146 81.8626C3.03512 83.2904 2.62284 84.788 2.2578 86.3583L2.11706 86.9821C1.79782 88.4339 1.54947 89.8554 1.36884 91.2469L0.377778 91.1186C-0.0765798 94.619 -0.11267 97.9454 0.228122 101.107L1.22163 100.999C1.58048 104.328 2.36773 107.468 3.53271 110.429L2.60328 110.795C3.82519 113.901 5.45082 116.818 7.42516 119.556L8.2359 118.971C10.1031 121.561 12.2941 123.994 14.7628 126.28L14.0841 127.013C16.4724 129.225 19.1094 131.296 21.9522 133.234L22.5158 132.408C25.1727 134.219 28.0157 135.916 31.0092 137.506L30.5412 138.387C33.4368 139.925 36.4672 141.361 39.6004 142.701L39.9931 141.784C42.9994 143.07 46.1034 144.27 49.2757 145.387L48.9449 146.328C52.0752 147.431 55.2687 148.456 58.4993 149.406L58.7805 148.446C61.9665 149.382 65.1895 150.247 68.4221 151.045L68.1826 152.014C71.4439 152.819 74.7136 153.557 77.965 154.233L78.1685 153.253C81.4707 153.939 84.7545 154.56 87.9907 155.124L87.8184 156.109C91.1864 156.696 94.5028 157.218 97.7345 157.686L97.8776 156.698C101.289 157.192 104.607 157.623 107.793 157.999L107.676 158.99C111.172 159.403 114.508 159.752 117.635 160.043L117.729 159.047C121.365 159.386 124.717 159.65 127.706 159.855L127.637 160.853C131.747 161.135 135.172 161.304 137.706 161.408L137.746 160.41C139.317 160.475 140.544 160.513 141.376 160.535C141.633 160.541 141.853 160.546 142.034 160.55C142.12 160.385 142.227 160.183 142.35 159.946Z" stroke="#A5CECA" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>

                    <svg className='absolute right-[6rem] top-[11rem] z-[9]' xmlns="http://www.w3.org/2000/svg" width="175" height="108" viewBox="0 0 175 108" fill="none">
                        <path d="M142.35 159.946C142.74 159.192 143.31 158.08 144.023 156.649L144.915 157.093C146.068 154.78 147.595 151.64 149.349 147.835L148.443 147.417C149.72 144.645 151.119 141.519 152.583 138.105L153.501 138.5C154.764 135.553 156.074 132.391 157.397 129.057L156.471 128.689C157.675 125.653 158.889 122.473 160.086 119.18L161.025 119.522C162.163 116.391 163.284 113.158 164.367 109.85L163.417 109.538C164.458 106.359 165.462 103.11 166.409 99.8163L167.368 100.092C168.302 96.8376 169.183 93.5382 169.986 90.2164L169.987 90.2159L169.015 89.9801C169.813 86.6808 170.535 83.3611 171.162 80.0434L172.143 80.2297C172.78 76.857 173.319 73.4848 173.741 70.1365L172.752 70.0115C173.18 66.614 173.485 63.2441 173.646 59.9268L174.643 59.9756C174.811 56.5039 174.824 53.0859 174.656 49.7492L173.658 49.7996C173.485 46.3621 173.117 43.0177 172.53 39.7976L173.512 39.6184C172.887 36.19 172.014 32.8938 170.864 29.7652L169.928 30.1091C168.759 26.9322 167.3 23.9399 165.519 21.1682L166.36 20.6293C164.536 17.7898 162.377 15.1716 159.848 12.8136L159.166 13.5428C156.822 11.357 154.149 9.39806 151.114 7.7008L151.601 6.83008C148.797 5.26194 145.696 3.91447 142.273 2.81342L141.967 3.7632C140.793 3.3853 139.578 3.03744 138.323 2.7191L137.055 2.41014C135.485 2.04519 133.959 1.75512 132.477 1.53513L132.623 0.548965C129.269 0.0512437 126.123 -0.0938357 123.17 0.0649833L123.223 1.05923C119.957 1.23494 116.941 1.79288 114.156 2.6643L113.859 1.71262C110.743 2.68782 107.9 4.04571 105.307 5.70174L105.845 6.54274C103.228 8.21409 100.867 10.1998 98.7384 12.4099L98.0187 11.718C95.8229 13.9976 93.874 16.5034 92.1455 19.1365L92.981 19.6838C91.2617 22.3029 89.761 25.0554 88.4519 27.8402L87.5473 27.4165C86.1654 30.3565 84.9976 33.3255 84.0128 36.2075L84.958 36.53C83.8783 39.6899 83.0201 42.7461 82.3408 45.5413L81.3709 45.3066C80.4826 48.9618 79.8975 52.1703 79.5246 54.5879L80.5117 54.7393C80.2885 56.1862 80.1422 57.3452 80.0515 58.1402C80.0062 58.5376 79.9754 58.8444 79.9555 59.0502C79.9456 59.1531 79.938 59.2311 79.9334 59.2825C79.9312 59.308 79.9297 59.3272 79.9287 59.3396C79.9282 59.3456 79.928 59.35 79.9277 59.3528C79.9276 59.354 79.9272 59.3549 79.9271 59.3555L79.9276 59.3563L79.8181 60.7027L78.5627 60.2052L78.5618 60.2058C78.5613 60.2056 78.5607 60.2043 78.5594 60.2038C78.5568 60.2028 78.5521 60.2016 78.5463 60.1993C78.5347 60.1948 78.5169 60.1876 78.493 60.1784C78.4449 60.1598 78.3722 60.1317 78.2756 60.0953C78.0821 60.0222 77.7933 59.9149 77.4166 59.78C76.6631 59.5102 75.5583 59.1297 74.1612 58.6908L74.4607 57.7381C72.1264 57.0047 68.9886 56.112 65.3161 55.2947L65.0997 56.2682C62.2912 55.6432 59.1689 55.064 55.8562 54.6377L55.9837 53.6471C52.9622 53.2583 49.7818 52.9958 46.533 52.9383L46.5151 53.9366C43.4379 53.8822 40.3049 54.0148 37.1954 54.4025L37.072 53.4117C33.9459 53.8016 30.8372 54.4462 27.8224 55.4125L28.1275 56.3625C25.2049 57.2991 22.3808 58.5431 19.7266 60.1563L19.2072 59.304C16.5786 60.9017 14.1071 62.8556 11.8581 65.2246L12.582 65.9104C10.5727 68.0268 8.74311 70.489 7.14535 73.3446L6.27484 72.8594C4.83087 75.4404 3.57273 78.3291 2.54023 81.5599L3.49146 81.8626C3.03512 83.2904 2.62284 84.788 2.2578 86.3583L2.11706 86.9821C1.79782 88.4339 1.54947 89.8554 1.36884 91.2469L0.377778 91.1186C-0.0765798 94.619 -0.11267 97.9454 0.228122 101.107L1.22163 100.999C1.58048 104.328 2.36773 107.468 3.53271 110.429L2.60328 110.795C3.82519 113.901 5.45082 116.818 7.42516 119.556L8.2359 118.971C10.1031 121.561 12.2941 123.994 14.7628 126.28L14.0841 127.013C16.4724 129.225 19.1094 131.296 21.9522 133.234L22.5158 132.408C25.1727 134.219 28.0157 135.916 31.0092 137.506L30.5412 138.387C33.4368 139.925 36.4672 141.361 39.6004 142.701L39.9931 141.784C42.9994 143.07 46.1034 144.27 49.2757 145.387L48.9449 146.328C52.0752 147.431 55.2687 148.456 58.4993 149.406L58.7805 148.446C61.9665 149.382 65.1895 150.247 68.4221 151.045L68.1826 152.014C71.4439 152.819 74.7136 153.557 77.965 154.233L78.1685 153.253C81.4707 153.939 84.7545 154.56 87.9907 155.124L87.8184 156.109C91.1864 156.696 94.5028 157.218 97.7345 157.686L97.8776 156.698C101.289 157.192 104.607 157.623 107.793 157.999L107.676 158.99C111.172 159.403 114.508 159.752 117.635 160.043L117.729 159.047C121.365 159.386 124.717 159.65 127.706 159.855L127.637 160.853C131.747 161.135 135.172 161.304 137.706 161.408L137.746 160.41C139.317 160.475 140.544 160.513 141.376 160.535C141.633 160.541 141.853 160.546 142.034 160.55C142.12 160.385 142.227 160.183 142.35 159.946Z" stroke="#A5CECA" strokeWidth="2" strokeDasharray="10 10" />
                    </svg>

                    <div className='relative z-[12]'>
                        <h3 className='text-[3rem] font-[700]'>Virtual Gift Card</h3>
                        <p className='mt-[1.5rem] font-[400] text-base'>Delivered by email, on a date of your choice</p>
                    </div>

                    <div className='relative z-[12] flex flex-col gap-y-[1rem] md:flex-row md:gap-x-[1rem]'>
                        <div className='w-[100%] md:w-[50%]'>
                            {
                                designImage && <div className=" w-full md:w-[70%] relative h-auto mt-[2.5rem]">
                                    <NextImage
                                        src={designImage}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="object-cover rounded w-full h-full"
                                        alt="Preview"
                                    />
                                </div>
                            }
                        </div>

                        <div className='w-full md:w-[50%] flex flex-col gap-y-[1.5rem]'>
                            <div className='w-full'>
                                <span className='font-[700] text-[1.25rem]'>Voucher Design</span>

                                <div className='w-full mt-[1rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                    {voucherDesigns?.map((design) => (
                                        <div
                                            key={design.design_id}
                                            className={`cursor-pointer rounded-lg overflow-hidden transition-all ${voucherType === design.design_id
                                                ? 'border-[#E82989] ring-2 ring-[#E82989]'
                                                : 'border-gray-300'
                                                }`}
                                            onClick={() => {
                                                setSelectVoucherType(design.design_id);
                                                setDesignImage(design.url);
                                            }}
                                        >
                                            <NextImage
                                                src={design.url}
                                                width={300}
                                                height={180}
                                                className='object-cover w-full h-auto rounded'
                                                unoptimized
                                                alt={design.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-[1rem] w-full'>
                                <span className='font-[700] text-[1.25rem]'>Voucher amount</span>

                                <div className='flex flex-row gap-x-[0.5rem] flex-wrap gap-y-[0.5rem]'>
                                    {voucherAmounts.map((amount, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedAmount(amount)}
                                            className={`border border-black px-[1rem] py-[0.5rem] text-nowrap cursor-pointer 
                                                ${selectedAmount === amount ? "bg-[#E82989] border-[#E82989] text-white" : ""}
                                            `}
                                        >
                                            <span>
                                                {amount === "Custom" ? "Custom" : `KES ${amount}`}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {selectedAmount === "Custom" && (
                                    <div className='flex flex-col gap-y-[0.75rem] w-full mt-4'>
                                        <span className='font-[400] text-base'>Enter custom amount:</span>

                                        <Input
                                            type='number'
                                            placeholder='Custom amount'
                                            className='h-[2.5rem]'
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col gap-y-[1rem]'>
                                <span className='font-[700] text-[1.25rem]'>To:</span>

                                <div className="flex justify-between flex-col gap-y-[1rem] items-center mb-[1.62rem] gap-x-[1.62rem] w-full">
                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400]'>Recipient’s name:</span>

                                        <Input
                                            placeholder='Name'
                                            className='h-[2.5rem]'
                                            value={recipientName}
                                            onChange={e => setRecipientName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400] text-base'>Recipient’s email address:</span>

                                        <div className='relative'>
                                            <Input
                                                placeholder='Email'
                                                className='pl-[2.5rem] h-[2.5rem]'
                                                value={recipientEmail}
                                                onChange={e => setRecipientEmail(e.target.value)}
                                            />

                                            <svg className='absolute left-[0.75rem] top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                                <path d="M18 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM18 2V2.511L10 8.734L2 2.512V2H18ZM2 14V5.044L9.386 10.789C9.56111 10.9265 9.77733 11.0013 10 11.0013C10.2227 11.0013 10.4389 10.9265 10.614 10.789L18 5.044L18.002 14H2Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col gap-y-[1rem] w-full'>
                                <span className='font-[700] text-[1.25rem]'>From:</span>

                                <div className="flex justify-between flex-col gap-y-[1rem] items-center mb-[1.62rem] gap-x-[1.62rem] w-full">
                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400]'>Enter your name:</span>

                                        <Input
                                            placeholder='Name'
                                            className='h-[2.5rem]'
                                            value={senderName}
                                            onChange={e => setSenderName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                        <span className='font-[400] text-base'>Delivery date:</span>

                                        <Input
                                            type='date'
                                            placeholder='Email'
                                            className='pl-[2.5rem] h-[2.5rem]'
                                            value={deliveryDate}
                                            onChange={e => setDeliveryDate(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col gap-y-[1rem] w-full'>
                                <div className='flex flex-col gap-y-[0.75rem] w-full'>
                                    <span className='font-[400]'>Enter your phone number:</span>

                                    <Input
                                        placeholder='Phone'
                                        className='h-[2.5rem]'
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        onBlur={() => setPhone(normalizePhoneTo254(phone))}
                                    />
                                </div>
                            </div>

                            <Textarea
                                placeholder='Message'
                                className='min-h-[10rem] w-full mt-[1rem]'
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='w-full flex items-start gap-x-[1rem] md:gap-x-[2rem] mt-[2rem]'>
                        <Button
                            className='bg-[#E82989] md:min-w-[10rem] text-white'
                            onClick={handleCreate}
                        >
                            Create
                        </Button>

                        <Button className='bg-white border md:min-w-[10rem] border-black text-black'>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DashboardLayout>

            <SuccessModal
                designImage={designImage}
                recipientEmail={recipientEmail}
            />
        </Navigation>
    )
}
