import React from "react"

export default function OrderDetailsFlow() {
    const orderFlow = [
        "Order Placed",
        "Pending Confirmation",
        "Processing",
        "Dispatched",
        "Delivered",
    ]

    const currentStatus = "Delivered"
    const isCancelled = false

    const stepIndex = orderFlow.indexOf(currentStatus)

    return (
        <div className="w-full flex items-start justify-center mt-[2rem] md:mt-[2.5rem] px-[1rem] lg:px-[3rem]">
            {orderFlow.map((step, index) => {
                let dotClass = ""
                if (isCancelled) {
                    dotClass = "bg-red-500"
                } else if (index <= stepIndex) {
                    dotClass = "bg-[#34C759] border-[0.19rem] border-[#34C759]"
                } else {
                    dotClass = "bg-black"
                }

                let connectorClass = ""
                if (isCancelled) {
                    connectorClass = "bg-red-500"
                } else if (index < stepIndex) {
                    connectorClass = "bg-[#34C759]"
                } else {
                    connectorClass = "bg-black"
                }

                return (
                    <div key={index} className="flex flex-col items-start flex-1 justify-start">
                        <div className="flex items-center w-full">
                            <div className={`w-[0.9rem] h-[0.9rem] rounded-full ${dotClass}`} />

                            {index < orderFlow.length - 1 && (
                                <div className={`flex-1 h-[3px] ${connectorClass}`} />
                            )}

                            {
                                index === orderFlow.length - 1 &&
                                stepIndex === orderFlow.length - 1 && (
                                    <div className={`flex-1 h-[3px] ${connectorClass}`} />
                                )
                            }
                        </div>

                        <p className={`text-xs mt-2 text-center ${index <= stepIndex ? "text-black" : "text-gray-400"}`}>{step}</p>
                    </div>
                )
            })}
        </div>
    )
}
