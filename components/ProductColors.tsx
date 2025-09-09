import React from 'react'

export default function ProductColors() {
    const stars = Array(5).fill(0);

    return (
        <div className="flex gap-1 mt-[1rem]">
            {stars.map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#78B464" />
                </svg>
            ))}
        </div>
    );
}
