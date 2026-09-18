import React from "react";
import { ShoppingBag } from "lucide-react";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  className?: string;
  textColor?: string;
}

export default function LoadingIndicator({
  size = "md",
  text,
  fullScreen = false,
  className = "",
  textColor,
}: Readonly<LoadingIndicatorProps>) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
    xl: "w-10 h-10",
  };

  const ringSize = sizeClasses[size] || sizeClasses.md;
  const iconSize = iconSizes[size] || iconSizes.md;

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Luxury Animated Loader */}
      <div className={`relative flex items-center justify-center ${ringSize}`}>
        {/* Outer Glowing Gradient Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--primary)] border-r-[var(--accent)] animate-luxury-spin shadow-sm shadow-[var(--primary)]/30" />

        {/* Inner Counter-Rotating Ring */}
        <div className="absolute inset-[3px] rounded-full border-2 border-transparent border-b-[var(--secondary)] border-l-[var(--primary)] animate-luxury-spin-reverse opacity-85" />

        {/* Center E-Commerce Shopping Bag Core */}
        <div className="relative z-10 flex items-center justify-center animate-luxury-pulse text-[var(--primary)]">
          <ShoppingBag className={iconSize} />
        </div>

        {/* Ambient Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-[var(--primary)]/15 blur-md animate-pulse pointer-events-none" />
      </div>

      {/* Optional Animated Typography */}
      {text && (
        <p
          className={`tracking-[0.25em] font-serif text-xs uppercase font-semibold animate-pulse text-center ${
            textColor || "text-[var(--foreground)] opacity-90"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/85 backdrop-blur-md transition-all duration-300">
        {content}
      </div>
    );
  }

  return content;
}
