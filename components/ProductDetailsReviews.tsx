"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ProductCustomerReview from "./ProductCustomerReview"

export function ProductDetailsReviews() {
    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="details" className="w-full mt-[2rem]">
                <TabsList className="flex gap-[1.5rem] justify-start border-b border-none bg-transparent p-0">
                    <TabsTrigger
                        value="details"
                        className="rounded-none bg-white border-b-2 border-l-0 border-t-0 border-r-0 pb-2 shadow-none text-sm font-medium text-[#6C737F] data-[state=active]:border-[#C22172] data-[state=active]:text-[#f7479f]"
                    >
                        Details
                    </TabsTrigger>

                    <TabsTrigger
                        className="rounded-none bg-white border-b-2 border-l-0 border-t-0 border-r-0 pb-2 shadow-none text-sm font-medium text-[#6C737F] data-[state=active]:border-[#C22172] data-[state=active]:text-[#f7479f]"
                        value="customer-reviews"
                    >
                        Customer Reviews (10)
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <div className="w-full px-[1.5rem] mt-[0.5rem]">
                        <ul className="flex flex-col gap-y-[0.32rem] flex-wrap">
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                            <li className="list-disc font-[400] text-[0.875rem]">High-impact wheels with all-terrain bicycle tires</li>
                        </ul>
                    </div>
                </TabsContent>

                <TabsContent value="customer-reviews">
                    <ProductCustomerReview />
                </TabsContent>
            </Tabs>
        </div>
    )
}

