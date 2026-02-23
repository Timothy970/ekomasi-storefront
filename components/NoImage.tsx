"use client";

export default function NoImage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg">
            <svg
                className="w-12 h-12 text-[#D1D5DB] mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            <span className="text-[#9CA3AF] font-poppins text-xs font-medium uppercase tracking-wider">
                No Image Available
            </span>
        </div>
    )
}
