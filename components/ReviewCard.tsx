import React, { useId } from "react";

interface ReviewCardProps {
  user: string;
  details: string;
  score: number;
  created_at: string;
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
  >
    <path
      d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z"
      fill="#FFCC00"
    />
  </svg>
);

export default function ReviewCard({
  user,
  created_at,
  score,
  details,
}: Readonly<ReviewCardProps>) {
  const baseId = useId();
  const stars = Array.from({ length: 5 }, (_, i) => `${baseId}-star-${i}`);

  return (
    <div className="p-[2rem] border border-[#CCC] rounded-[0.5rem] gap-[1rem] mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {stars.map((starKey, i) =>
            i < score ? (
              <StarIcon key={starKey} />
            ) : (
              <div key={starKey} className="w-[20px] h-[19px]" />
            )
          )}
        </div>
        <span className="text-[#666] font-[400]">
          {new Date(created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <span className="font-[400] block">{user}</span>
      <p className="mt-[0.5rem]">{details}</p>
    </div>
  );
}
