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
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

export const DELIVERY_STATUS = {
  NOT_SHIPPED: "not shipped",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out for delivery",
  DELIVERED: "delivered",
  RETURNED: "returned",
};

export const orderStatusOptions = [
  { value: "all", label: "All" },
  { value: ORDER_STATUS.PENDING, label: "Pending" },
  { value: ORDER_STATUS.CONFIRMED, label: "Confirmed" },
  { value: ORDER_STATUS.PROCESSING, label: "Processing" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancelled" },
  { value: ORDER_STATUS.COMPLETED, label: "Completed" },
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
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

export const paymentMethodOptions = [
  { value: "all", label: "All" },
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
];

export const isOngoingOrder = (order: Order) => {
  const ongoingOrderStatuses = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.COMPLETED,
  ];

  const ongoingDeliveryStatuses = [
    DELIVERY_STATUS.NOT_SHIPPED,
    DELIVERY_STATUS.SHIPPED,
    DELIVERY_STATUS.OUT_FOR_DELIVERY,
  ];

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