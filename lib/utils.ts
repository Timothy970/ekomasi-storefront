import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parse from 'html-react-parser';
import { Order } from "./features/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function customParser(string: string | undefined) {
  if (string) {
    return parse(string)
  }
  return string
}

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  DELIVERED: "DELIVERED",
};

export const DELIVERY_STATUS = {
  NOT_SHIPPED: "NOT SHIPPED",
  SHIPPED: "SHIPPED",
  OUT_FOR_DELIVERY: "OUT FOR DELIVERY",
  DELIVERED: "DELIVERED",
  RETURNED: "RETURNED",
};

export const orderStatusOptions = [
  { value: "all", label: "All" },
  { value: ORDER_STATUS.PENDING, label: "Pending" },
  { value: ORDER_STATUS.CONFIRMED, label: "Confirmed" },
  { value: ORDER_STATUS.PROCESSING, label: "Processing" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancelled" },
  { value: ORDER_STATUS.COMPLETED, label: "Completed" },
  { value: ORDER_STATUS.DELIVERED, label: "Delivered" },
];

export const deliveryStatusOptions = [
  { value: "all", label: "All" },
  { value: DELIVERY_STATUS.NOT_SHIPPED, label: "Not Shipped" },
  { value: DELIVERY_STATUS.SHIPPED, label: "Shipped" },
  { value: DELIVERY_STATUS.OUT_FOR_DELIVERY, label: "Out for Delivery" },
  { value: DELIVERY_STATUS.DELIVERED, label: "Delivered" },
  { value: DELIVERY_STATUS.RETURNED, label: "Returned" },
];

export const paymentStatusOptions = [
  { value: "All", label: "All" },
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
  { value: "Failed", label: "Failed" },
  { value: "Refunded", label: "Refunded" },
];

export const paymentMethodOptions = [
  { value: "All", label: "All" },
  { value: "Credit card", label: "Credit Card" },
  { value: "Paypal", label: "PayPal" },
  { value: "Bank transfer", label: "Bank Transfer" },
  { value: "Cash on delivery", label: "Cash on Delivery" },
];

export const isOngoingOrder = (order: Order) => {
  const ongoingOrderStatuses = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.DELIVERED,
  ].map(status => status.toLowerCase());

  const ongoingDeliveryStatuses = [
    DELIVERY_STATUS.NOT_SHIPPED,
    DELIVERY_STATUS.SHIPPED,
    DELIVERY_STATUS.OUT_FOR_DELIVERY,
  ].map(status => status.toLowerCase());

  return (
    ongoingOrderStatuses.includes(order.order_status?.toLowerCase()) ||
    ongoingDeliveryStatuses.includes(order.delivery_status?.toLowerCase())
  );
};

export const isCancelledOrder = (order: Order) => {
  return (
    order.order_status === ORDER_STATUS.CANCELLED ||
    order.delivery_status === DELIVERY_STATUS.RETURNED
  );
};

export const FEATURE_DESIGN_TYPES = [
  "top-section",
  "single-image-side-section",
  "two-images",
  "one-image",
]

export function truncateText(text: string, limit = 100): string {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}


export const RETURN_STATUS = {
  REJECTED: "rejected",
  APPROVED: "approved",
  PENDING: "pending",
}

export const COVER_VIDEO_CONFIG = {
  file: {
    attributes: {
      style: { objectFit: "cover", width: "100%", height: "100%" },
    },
  },
};