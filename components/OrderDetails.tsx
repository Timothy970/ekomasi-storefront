import Image from 'next/image'
import React, { useState } from 'react'
import { format, addDays } from "date-fns";
import { CreateReturnPayload, Order } from '@/lib/features/types';
import { Button } from './ui/button';
import { useReview } from '@/app/ClientLayout';
import { DELIVERY_STATUS, ORDER_STATUS } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useAppDispatch } from '@/lib/hooks';
import { createReturnsAsync } from '@/lib/features/returns/returnSlice';
import { triggerToast } from '@/app/utils/toastUtils';

type OrderDetailsProps = {
  order: Order;
  setProductReviewId: React.Dispatch<React.SetStateAction<string | undefined>>
  toReturn?: boolean
  onCloseReturn?: () => void
}

export default function OrderDetails({ order, setProductReviewId, toReturn, onCloseReturn }: OrderDetailsProps) {
  const { setOpenReviewModal } = useReview()
  const [checkedValues, setCheckedValues] = useState<string[]>([])
  const [reason, setReason] = useState('');
  const dispatch = useAppDispatch();


  const handleToggle = (productId: string) => {
    setCheckedValues((prevCheckedValues) => {
      if (prevCheckedValues.includes(productId)) {
        return prevCheckedValues.filter((id) => id !== productId);
      } else {
        return [...prevCheckedValues, productId];
      }
    });
  }

  const handleReturnItems = async () => {
    const payload: CreateReturnPayload = {
      order_id: order.order_id,
      products: checkedValues.map((productId) => ({
        product_id: productId,
        quantity: order.items.find(item => item.product_id === productId)?.stock_quantity || 1,
      })),
      reason: reason,
    };
    const response = await dispatch(createReturnsAsync(payload)).unwrap();
    if (response?.status_code === 201) {
      setCheckedValues([]);
      setReason('');
      onCloseReturn?.();
      triggerToast("Return request created successfully.", "success");
    } else {
      triggerToast("Failed to create return request.", "error");
    }

  }

  return (
    <div className='mt-[2rem] md:mt-[2.5rem] w-full px-[1rem] lg:px-[3rem] flex flex-col md:flex-row md:justify-between'>
      <div className='w-full md:w-[50%]'>
        <h2 className='font-bold text-[1.5rem] mt-[1rem]'>Order Summary</h2>

        <p className="text-[1.125rem] mt-[0.5rem]">
          {(() => {
            if (!order?.created_at) return "Arrives soon";

            const createdDate = new Date(order.created_at);
            const startDate = addDays(createdDate, 10);
            const endDate = addDays(createdDate, 14);

            const formattedStart = format(startDate, "EEE, MMM dd");
            const formattedEnd = format(endDate, "EEE, MMM dd");

            return `Arrives ${formattedStart} - ${formattedEnd}`;
          })()}
        </p>

        <div className='w-full flex flex-col gap-y-[0.5rem] mt-[1.5rem]'>
          {
            order?.items?.map((item, index) => {
              const isChecked = checkedValues.includes(item.product_id);

              return <div key={index?.toString()} className='gap-x-[0.75rem] w-full flex pb-[1.5rem] md:gap-x-[2rem] justify-start items-start border-b border-[rgba(0,0,0,0.40)]'>
                {
                  item?.urls &&
                  <div className="relative w-1/3 h-[13.5rem] min-w-[9rem] max-w-[6rem] max-h-[9rem] md:min-w-[12rem] md:max-w-[12rem] md:max-h-[12rem] flex-shrink-0">
                    <Image
                      src={item?.urls[0]?.url}
                      alt={''}
                      fill
                      unoptimized
                      className="object-cover h-full w-full"
                    />
                  </div>
                }

                <div className='w-[60%] flex flex-col gap-y-[0.5rem]'>
                  <div className='flex text-custom-black gap-x-[0.5rem]'>
                    <span className='uppercase font-medium'>
                      {"KES " + new Intl.NumberFormat("en-KE", {
                        minimumFractionDigits: 0,
                      }).format(order?.total_amount ?? 0)}
                    </span>
                  </div>

                  <span className='text-[1.125rem] font-semibold capitalize'>{item?.name}</span>

                  <div className='flex flex-row w-full gap-x-[0.5rem]'>
                    <span className='text-[1.125rem]'>Qty:</span>
                    <span className='text-[1.125rem] font-light'>{item?.stock_quantity}</span>
                  </div>
                </div>

                {
                  ((order?.order_status === ORDER_STATUS?.COMPLETED && order?.delivery_status === DELIVERY_STATUS?.DELIVERED) ||
                    (order?.order_status === "Delivered" && order?.delivery_status === DELIVERY_STATUS?.DELIVERED)) && <div>
                    <Button onClick={() => {
                      setOpenReviewModal(true)
                      setProductReviewId(item?.product_id)
                    }
                    }
                      className='rounded-[2.5rem] bg-[#AF52DE] hover:bg-[#AF52DE] font-[400]'>
                      Write a review
                    </Button>
                  </div>
                }
                {toReturn &&
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => handleToggle(item.product_id)}
                    className="border border-black rounded-none h-[1rem] lg:h-[1.125rem] w-[1rem] lg:w-[1.125rem]"
                  />
                }
              </div>
            })
          }
          {toReturn && (
            <div
              className='w-full flex flex-col justify-start items-center gap-y-[1rem]'>
              <Textarea
                className="w-full bg-white h-24 rounded-[0.5rem] px-3 py-2 text-[0.875rem]"
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Add a reason for return"
              />
              <Button
                disabled={checkedValues.length === 0 || reason.trim() === ''}
                onClick={() => handleReturnItems()} className='bg-[#E82989] hover:bg-[#E82989] rounded-[0.5rem] h-[2.5rem] max-w-[12rem]'>
                <span>Return Items</span>
              </Button>
            </div>
          )
          }

        </div>
      </div>

      <div className='w-full md:w-[30%] mt-[1rem]'>
        <div className='flex flex-col gap-y-[1rem]'>
          <div className="flex w-full justify-between items-start md:border-t border-[#AAA] pt-[1.25rem]">
            <h3 className="font-bold">Address</h3>

            <div className="flex flex-col w-full justify-end text-end items-end">
              {
                order?.guest_delivery_address && <div className="mb-2 text-[0.875rem] flex flex-col gap-y-[0.5rem] w-full">
                  <span>{order.guest_delivery_address.street}</span>
                  <span>{order.guest_delivery_address.apartment}</span>
                  <span>
                    {order.guest_delivery_address.city}, {order.guest_delivery_address.state}
                  </span>
                  <span>
                    {order.guest_delivery_address.postal_code}, {order.guest_delivery_address.country}
                  </span>
                </div>
              }
            </div>
          </div>

          <div className='flex w-full justify-between items-start border-t border-[#AAA] pt-[1.25rem]'>
            <h3 className='font-bold'>Payment</h3>

            <div className='flex flex-col'>
              <span>{order?.payment_method}</span>
            </div>
          </div>

          <div className='border-t border-[#AAA] pt-[1.25rem]'>
            <h3 className='font-bold'>Summary</h3>

            <div className='flex w-full flex-col justify-between mb-[0.5rem] gap-y-[1rem] mt-[1rem]'>
              <div className='flex justify-between w-full'>
                <span className='text-[0.875rem] text-[#444]'>Subtotal</span>
                <span className='text-custom-black text-[0.875rem]'>{order?.sub_total}</span>
              </div>

              <div className='flex justify-between w-full'>
                <span className='text-[0.875rem] text-[#444]'>Estimated Shipping & Handling</span>
                <span className='text-custom-black text-[0.875rem]'>{order?.delivery_charge}</span>
              </div>

              <div className='flex justify-between w-full'>
                <span className='text-[0.875rem] text-[#444]'>Estimated Tax</span>
                <span className='text-custom-black text-[0.875rem]'>{order?.estimated_tax}</span>
              </div>

              <div className='flex justify-between w-full'>
                <span className='text-[0.875rem] text-[#444]'>Discount Total</span>
                <span className='text-custom-black text-[0.875rem]'>{order?.total_discount}</span>
              </div>
            </div>

            <div className='w-full flex justify-between border-b border-black border-t py-[1rem]'>
              <span>Total</span>
              <span>
                {order?.total_amount}
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-y-[0.5rem] w-full justify-between items-start pt-[1.25rem]'>
            <h3 className='font-bold'>Need Help?</h3>

            <div className='flex flex-col'>
              <span className='text-[0.875rem] font-medium'>Shipping and Delivery</span>
              <span className='text-[0.875rem] font-medium'>Cancelling an Order</span>
              <span className='text-[0.875rem] font-medium'>Return Policy</span>
            </div>
          </div>

          <div className='flex flex-col gap-y-[1rem]'>
            <div className='flex items-center justify-start gap-x-[0.62rem]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 18V21.766L11.277 18H16C17.103 18 18 17.103 18 16V8C18 6.897 17.103 6 16 6H4C2.897 6 2 6.897 2 8V16C2 17.103 2.897 18 4 18H5ZM4 8H16V16H10.723L7 18.234V16H4V8Z" fill="black" />
                <path d="M20 2H8C6.897 2 6 2.897 6 4H18C19.103 4 20 4.897 20 6V14C21.103 14 22 13.103 22 12V4C22 2.897 21.103 2 20 2Z" fill="black" />
              </svg>

              <span className='text-[0.875rem] font-medium'>Chat Now</span>
            </div>

            <div className='flex items-center justify-start gap-x-[0.62rem]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20" fill="none">
                <path d="M12 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H12C13.103 20 14 19.103 14 18V2C14 0.897 13.103 0 12 0ZM2 14.999V3H12L12.002 14.999H2Z" fill="black" />
              </svg>

              <span className='text-[0.875rem] font-medium'>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
