"use client";

interface RatingProgressBarProps {
    count: number;
    total: number;
}

export default function RatingProgressBar({ count, total }: Readonly<RatingProgressBarProps>) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div className="w-full bg-[#EEE] h-[0.5rem] rounded-full overflow-hidden">
            <div
                className="h-full bg-secondary-tenant transition-all duration-300"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}
