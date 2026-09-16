import { CreateVoucherPayload } from '@/lib/features/types';
import { triggerToast } from '@/app/utils/toastUtils';

export const REQUIRED_USER_FIELDS: { key: keyof CreateVoucherPayload; label: string }[] = [
    { key: "design_id", label: "Design" },
    { key: "amount", label: "Amount" },
    { key: "to_name", label: "Recipient Name" },
    { key: "to_email", label: "Recipient Email" },
    { key: "from_name", label: "Sender Name" },
    { key: "delivery_time", label: "Delivery Time" },
    { key: "message", label: "Message" },
];

export function validateRoleBeforeSave(user: CreateVoucherPayload): boolean {
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

export function validateAmount(selectedAmount: number | string, customAmount: string, minAmount: number | string): boolean {
    let amountToCheck: number;

    if (selectedAmount === "Custom") {
        if (!customAmount || Number.isNaN(Number(customAmount)) || Number(customAmount) <= 0) {
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
}

export function normalizePhoneForSave(phone: string) {
    let val = phone.trim();
    if (val.startsWith("0")) {
        val = "254" + val.slice(1);
    }
    return val.replace(/\s+/g, "");
}

export function isValidKenyanPhone(phone: string) {
    const regex = /^254\d{9}$/;
    return regex.test(phone);
}
