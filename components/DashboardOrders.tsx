import { Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Order } from '@/lib/features/types';

interface DashboardOrdersProps {
  orders: Order[];
}

export default function DashboardOrders({ orders }: DashboardOrdersProps) {
  const router = useRouter();

  if (!orders || orders.length === 0) {
    return <p className="text-sm text-gray-500">No orders to display.</p>;
  }

  return (
    <div className="w-full flex flex-col items-start justify-start space-y-4">
      {orders.map((order) => {
        const firstItem = order.items[0];
        
        return (
          <div
            key={order.order_id}
            className="overflow-hidden cursor-pointer w-full flex flex-row border-b border-[rgba(0,0,0,0.40)] gap-x-[0.5rem]"
          >
            <div className="relative w-1/3 h-[13.5rem] md:h-[20rem] max-h-[25rem] flex-shrink-0">
              <Image
                src={'https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0'}
                alt={firstItem?.product_id || 'Product Image'}
                fill
                className="object-cover max-h-[70%] sm:max-h-[80%] md:max-h-[70%] lg:max-h-[80%]"
              />
            </div>

            <div className="flex w-full flex-col pl-4 lg:flex-row">
              <div className="flex-1 flex flex-col gap-y-[0.88rem]">
                <h3 className="truncate text-custom-black font-roboto text-[1.125rem] font-bold leading-6 capitalize pt-[1rem]">
                  {'Unknown Product'}
                </h3>

                <p className="font-poppins text-sm leading-[1.3rem] mt-1 line-clamp-2 capitalize">
                  Order {order?.order_id}
                </p>

                <div className="gap-x-[0.5rem] flex items-center justify-start">
                  <p className="text-[0.875rem] font-bold">
                    On {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <Dot />
                  <span className={order.status === 'pending' ? 'text-yellow-500' : order.status === 'delivered' ? 'text-green-500' : 'text-red-500'}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <Link href={`/dashboard/orders/${order.order_id}`} className="flex items-center justify-start gap-x-[1rem]">
                  <span className="text-[#AF52DE]">See details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M1.70697 11.4492L7.41397 5.74216L1.70697 0.0351562L0.292969 1.44916L4.58597 5.74216L0.292969 10.0352L1.70697 11.4492Z" fill="black" />
                  </svg>
                </Link>
              </div>

              <Button className="w-[6rem] h-[2rem] text-[0.875rem] my-[1rem]">Reorder</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
