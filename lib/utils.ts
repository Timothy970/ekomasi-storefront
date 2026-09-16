import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parse from 'html-react-parser';
import { Image, Order } from "./features/types";

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
      // Direct HTML5 video attributes
      style: { 
        objectFit: "cover", 
        width: "100%", 
        height: "100%" 
      },
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    },
    forceVideo: true, // Ensures files without extensions still play
  },

  youtube: {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,            // Don't show related videos from other channels
      showinfo: 0,
      modestbranding: 1, // Hide YouTube logo as much as possible
      iv_load_policy: 3, // Hide annotations
      mute: 1,           // YouTube-specific mute param
      // Note: For YouTube to loop, you ideally need the Video ID 
      // passed to the 'playlist' parameter.
      loop: 1,
    },
  },

  vimeo: {
    playerOptions: {
      background: true,  // Automatically hides controls and loops
      muted: true,
      autopause: false,  // Prevents other players from stopping this one
      portrait: false,
      title: false,
      byline: false,
    },
  },

  twitch: {
    options: {
      autoplay: true,
      muted: true,
      controls: false,
    },
  },

  facebook: {
    attributes: {
      style: { objectFit: "cover", width: "100%", height: "100%" },
    },
  },

  wistia: {
    options: {
      autoPlay: true,
      muted: true,
      silentAutoPlay: "allow", // Wistia specific bypass
      controlsVisibleOnLoad: false,
      videoFoam: true, // Makes it responsive
    },
  },

  dailymotion: {
    params: {
      autoplay: true,
      mute: true,
      controls: false,
      "ui-start-screen-info": false,
      "ui-logo": false,
    },
  },
};

export const extractVideoId = (url: string): { id: string; provider: "youtube" | "vimeo" | "html5" } | null => {
  if (!url) return null;

  // YouTube
  const ytRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const ytMatch = ytRegExp.exec(url);
  if (ytMatch?.[7]?.length === 11) {
    return { id: ytMatch[7], provider: "youtube" };
  }

  // YouTube Shortened
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return { id: urlObj.pathname.slice(1), provider: "youtube" };
    }
  } catch (e) {
    console.error(e);
  }

  // Vimeo
  const vimeoRegExp = /^.*(vimeo\.com\/)((channels\/[^]+\/)|(groups\/[^]+\/content\/)|(album\/[^]+\/video\/))?(\d+)/;
  const vimeoMatch = vimeoRegExp.exec(url);
  if (vimeoMatch) {
    return { id: vimeoMatch[6], provider: "vimeo" };
  }

  // HTML5 (if it looks like a direct video link or common video host)
  if (/\.(mp4|webm|ogg)$/i.exec(url) || url.includes('blob:') || !url.includes('.')) {
     return { id: url, provider: "html5" };
  }

  return null;
};

export const getProductImageUrl = (urls?: Image[]): string => {

  const imageMedia = urls?.filter((media) => media.type === "gallery" || media.type === "thumbnail");
  const primaryImage = imageMedia?.find((img) => img.is_primary);
  const imageToShow = primaryImage || imageMedia?.[0];

  return imageToShow?.url || "";
};