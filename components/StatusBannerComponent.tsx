import { RETURN_STATUS } from "@/lib/utils";

const StatusBanner = ({ status }: Readonly<{ status: string }>) => {
    const STATUS_CONFIG = {
        [RETURN_STATUS.REJECTED]: {
            bg: "bg-[#FF3B308F]",
            message: "Your Return Request Was Rejected.",
        },
        [RETURN_STATUS.PENDING]: {
            bg: "bg-[#FFA5008F]",
            message: "Your Return Request Is Pending Review.",
        },
        [RETURN_STATUS.APPROVED]: {
            bg: "bg-[rgba(52,199,89,0.58)]",
            message: "Your Return Request Was Successfully Approved.",
        },
    };

    const { bg, message } = STATUS_CONFIG[status] || STATUS_CONFIG[RETURN_STATUS.APPROVED];

    return (
        <div className={`w-full flex items-center justify-center ${bg}`}>
            <div className="flex justify-center items-center gap-x-[1rem] font-medium py-[0.75rem]">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                    <path
                        d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                        fill="black"
                    />
                </svg>
                <p className="text-[0.875rem]">{message}</p>
            </div>
        </div>
    );
};

export default StatusBanner;