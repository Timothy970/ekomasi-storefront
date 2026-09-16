import { FormData } from '@/lib/features/types';
import { triggerToast } from '@/app/utils/toastUtils';

export const getRequiredFields = (page: "member" | "guest", deliveryType: "ship" | "in store") => {
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

export const isEmpty = (value: any) =>
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim() === "");

export const isFormComplete = (form: FormData, page: "member" | "guest", deliveryType: "ship" | "in store"): boolean => {
    const requiredFields = getRequiredFields(page, deliveryType);

    for (const { key } of requiredFields) {
        if (isEmpty(form[key])) return false;
    }

    if (isEmpty(form.email) && isEmpty(form.phone)) return false;

    return true;
};

export const validateForm = (form: FormData, page: "member" | "guest", deliveryType: "ship" | "in store"): boolean => {
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
