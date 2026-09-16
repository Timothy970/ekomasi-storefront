"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
    endDate: string;
}

export default function CountdownTimer({ endDate }: Readonly<CountdownTimerProps>) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const end = new Date(endDate).getTime();

        const updateTimer = () => {
            const now = Date.now();
            const difference = end - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    if (!timeLeft) return null;

    return (
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-center min-w-[3rem] p-1 bg-secondary-tenant text-white rounded">
                <span className="text-lg font-bold leading-none">{timeLeft.days}</span>
                <span className="text-[0.65rem] uppercase">Days</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center min-w-[3rem] p-1 bg-secondary-tenant text-white rounded">
                <span className="text-lg font-bold leading-none">
                    {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-[0.65rem] uppercase">Hrs</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center min-w-[3rem] p-1 bg-secondary-tenant text-white rounded">
                <span className="text-lg font-bold leading-none">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-[0.65rem] uppercase">Min</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center min-w-[3rem] p-1 bg-secondary-tenant text-white rounded">
                <span className="text-lg font-bold leading-none">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <span className="text-[0.65rem] uppercase">Sec</span>
            </div>
        </div>
    );
}
