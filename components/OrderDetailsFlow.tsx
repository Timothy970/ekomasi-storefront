"use client"
import { Order } from "@/lib/features/types"
import { DELIVERY_STATUS, ORDER_STATUS } from "@/lib/utils"
import React from "react"

type OrderDetailsFlowProps = {
    order: Order
}

export default function OrderDetailsFlow({ order }: Readonly<OrderDetailsFlowProps>) {
    const orderFlow = [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.PROCESSING,
        DELIVERY_STATUS.SHIPPED,
        DELIVERY_STATUS.OUT_FOR_DELIVERY,
        DELIVERY_STATUS.DELIVERED,
        ORDER_STATUS.COMPLETED,
    ]

    const orderIndex = orderFlow.indexOf(order?.order_status?.toUpperCase() ?? "")
    const deliveryIndex = orderFlow.indexOf(order?.delivery_status?.toUpperCase() ?? "")

    const stepIndex = Math.max(orderIndex, deliveryIndex)

    return (
        <div className="w-full overflow-x-scroll hide-scrollbar">
            <div className="w-full flex items-start md:justify-center mt-[2rem] md:mt-[5rem] px-[1rem] lg:px-[3rem]">
                {orderFlow.map((step, index) => {
                    let dotClass = ""

                    if (order?.order_status === ORDER_STATUS.CANCELLED) {
                        dotClass = "bg-red-500"
                    } else if (index <= stepIndex) {
                        dotClass = "bg-[#34C759] border-[0.19rem] border-[#34C759]"
                    } else {
                        dotClass = "bg-black"
                    }

                    let connectorClass = ""
                    
                    if (order?.order_status === ORDER_STATUS.CANCELLED) {
                        connectorClass = "bg-[#FF3B308F]"
                    } else if (index < stepIndex) {
                        connectorClass = "bg-[#34C759]"
                    } else if (index === orderFlow.length - 1 && stepIndex === orderFlow.length - 1) {
                        connectorClass = "bg-[#34C759]"
                    } else {
                        connectorClass = "bg-black"
                    }

                    return (
                        <div key={step} className="flex flex-col items-center min-w-[6rem] flex-shrink-0 justify-start">
                            <div className="flex items-center w-full">
                                {index < orderFlow.length - 1 && (
                                    <div className={`h-[0.1875rem] ${connectorClass}`} />
                                )}

                                <div className="p-[0.5rem] rounded-full">
                                    <div className={`w-[0.9rem] h-[0.9rem] rounded-full ${dotClass}`} />
                                </div>

                                {index < orderFlow.length - 1 && (
                                    <div className={`flex-1 h-[0.1875rem] ${connectorClass}`} />
                                )}

                                {index === orderFlow.length - 1 && (
                                    <div className={`flex-1 h-[0.1875rem] ${connectorClass}`} />
                                )}
                            </div>

                            <p className="text-[0.875rem] text-wrap px-4 lg:text-[1rem] mt-2 capitalize text-center font-bold text-black">
                                {step.replace(/_/g, " ")}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
