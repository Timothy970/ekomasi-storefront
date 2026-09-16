"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full border-b border-black pb-[1rem]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-[1rem]"
      >
        <span className="font-[600] text-base md:text-[1.125rem]">{title}</span>

        <ChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="py-2 text-sm">{children}</div>
      </div>
    </div>
  );
}
