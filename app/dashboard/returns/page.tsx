"use client"
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import ReturnsList from '@/components/ReturnsList'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getReturnsAsync, selectReturns } from '@/lib/features/returns/returnSlice'
import { Returns } from '@/lib/features/types'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { PackageX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RETURN_STATUS } from '@/lib/utils'

export default function Return() {
    const router = useRouter()
    const token = useAppSelector(selectUserToken)
    const dispatch = useAppDispatch()
    const returns = useAppSelector(selectReturns)
    const [pendingReturns, setPendingReturns] = useState<Returns[]>([]);
    const [approvedReturns, setApprovedReturns] = useState<Returns[]>([]);
    const [rejectedReturns, setRejectedReturns] = useState<Returns[]>([]);

    useEffect(() => {
        if (token) {
            dispatch(getReturnsAsync())
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (returns?.length) {
            const pending = returns.filter(
                r => r.status === RETURN_STATUS.PENDING
            );

            const approved = returns.filter(
                r => r.status === RETURN_STATUS.APPROVED
            );

            const rejected = returns.filter(
                r => r.status === RETURN_STATUS.REJECTED
            );

            setPendingReturns(pending);
            setApprovedReturns(approved);
            setRejectedReturns(rejected);
        } else {
            setPendingReturns([]);
            setApprovedReturns([]);
            setRejectedReturns([]);
        }
    }, [returns]);

    const handleStartShopping = () => {
        router.replace('/')
    }

    return (
        <Navigation>
            <DashboardLayout>
                <div className="space-y-4">
                    <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
                        <div className='flex flex-col gap-y-[1rem]'>
                            <PackageX className='text-[#804A9D] w-[3rem] h-[3rem]' />
                            <p className='text-[1.5rem] font-bold'>My Returned Items</p>
                        </div>
                    </div>

                    {
                        !returns?.length && <div className='bg-[#804A9D14] w-full p-[1rem] md:p-[2rem]'>
                            <div className='flex flex-col gap-y-[1rem]'>
                                <p className='text-[1.125rem] font-semibold'>No returned items yet!</p>
                                <p className='text-[1.125rem]'>Currently, you have no returned items. Find something you love. We’ve curated new styles just for you.</p>
                                <Button onClick={handleStartShopping} className='mt-[2rem] max-w-[20rem]'>Start Shopping</Button>
                            </div>
                        </div>
                    }

                    {
                        returns && returns.length > 0 && <Tabs defaultValue="pending" className="w-full bg-white">
                            <TabsList className="border-b gap-x-[1rem] rounded-none bg-white border-none text-wrap">
                                <TabsTrigger
                                    value="pending"
                                    className="data-[state=active]:border-b-2 font-[700] data-[state=active]:border-b-[#804A9D] data-[state=active]:font-semibold data-[state=active]:text-[#804A9D] border-t-0 border-l-0 border-r-0 rounded-none bg-white"
                                >
                                    PENDING
                                </TabsTrigger>
                                <TabsTrigger
                                    value="approved"
                                    className="data-[state=active]:border-b-2 font-[700] data-[state=active]:border-b-[#804A9D] data-[state=active]:font-semibold data-[state=active]:text-[#804A9D] border-t-0 border-l-0 border-r-0 rounded-none bg-white"
                                >
                                    APPROVED
                                </TabsTrigger>
                                <TabsTrigger
                                    value="rejected"
                                    className="data-[state=active]:border-b-2 font-[700] data-[state=active]:border-b-[#804A9D] data-[state=active]:font-semibold data-[state=active]:text-[#804A9D] border-t-0 border-l-0 border-r-0 rounded-none bg-white"
                                >
                                    REJECTED
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="pending" className='w-full'>
                                <ReturnsList returns={pendingReturns} />
                            </TabsContent>

                            <TabsContent value="approved" className='w-full'>
                                <ReturnsList returns={approvedReturns} />
                            </TabsContent>
                            <TabsContent value="rejected" className='w-full'>
                                <ReturnsList returns={rejectedReturns} />
                            </TabsContent>
                        </Tabs>
                    }
                </div>
            </DashboardLayout>
        </Navigation>
    )
}
