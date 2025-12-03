"use client"
import React, { useEffect, useMemo } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pagination, Voucher } from '@/lib/features/types'
import PaginationFooter from './PaginationFooter';
import { useFilterQuery } from '@/app/ClientLayout';
import { useRouter } from 'next/navigation';
import { getVouchersAsync } from '@/lib/voucher/voucherSlice';
import { useAppDispatch } from '@/lib/hooks';

type VouchersTableProps = {
    data: Voucher[];
    pagination: Pagination | null;
}

const columnHelper = createColumnHelper<Voucher>()

export default function VouchersTable({ data, pagination }: VouchersTableProps) {
    const { query, setQuery } = useFilterQuery();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const columns = [
        columnHelper.accessor('code', {
            header: 'Code',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('from', {
            header: 'Sender',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('balance', {
            header: 'Balance',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('created_at', {
            header: 'Issued',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('expiry_date', {
            header: 'Due',
            cell: info => {
                return (
                    <div className="flex items-center">
                        <span className='text-[0.875rem] font-[500] text-wrap'>{info?.getValue()}</span>
                    </div>
                )
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor("status", {
            header: "",
            cell: info => {
                const status = info.getValue();

                const getStatusStyle = (status: string) => {
                    switch (status.toLowerCase()) {
                        case "active":
                            return "bg-green-100 text-green-700 border border-green-300";
                        case "scheduled":
                            return "bg-yellow-100 text-yellow-700 border border-yellow-300";
                        case "redeemed":
                        case "used":
                            return "bg-blue-100 text-blue-700 border border-blue-300";
                        case "expired":
                            return "bg-red-100 text-red-700 border border-red-300";
                        default:
                            return "bg-gray-100 text-gray-700 border border-gray-300";
                    }
                };

                return (
                    <div className="flex items-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                                status
                            )}`}
                        >
                            {status}
                        </span>
                    </div>
                );
            },
            footer: info => info.column.id,
        })
    ]

    useEffect(() => {
        dispatch(getVouchersAsync(query))
    }, [query]);

    const handlePrev = () => {
        if (pagination?.has_prev) {
            const newQuery = new URLSearchParams(query);
            newQuery.set("page", String(pagination.page - 1));
            newQuery.set("size", String(pagination.size));
            setQuery(newQuery.toString());
            router.push(`?${newQuery.toString()}`);
        }
    };

    const handleNext = () => {
        if (pagination?.has_next) {
            const newQuery = new URLSearchParams(query);
            newQuery.set("page", String(pagination.page + 1));
            newQuery.set("size", String(pagination.size));
            setQuery(newQuery.toString());
            router.push(`?${newQuery.toString()}`);
        }
    };

    const filteredData = useMemo(() => {
        return data
    }, [data])

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='border rounded-[1.25rem] w-full overflow-x-scroll hide-scrollbar mt-[2rem]'>
            <div className='w-full rounded-bl-[1.25rem] rounded-br-[1.25rem]'>
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup, rowIndex) => (
                            <tr key={rowIndex} className='bg-[#F8F9FA] uppercase text-[0.75rem]'>
                                {headerGroup.headers.map((header, headerIndex) => (
                                    <th
                                        key={headerIndex}
                                        className="border-none p-2 h-[3rem] text-start text-nowrap"
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className='w-full'>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className='h-[3rem]'>
                                {row.getVisibleCells().map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-l-0 border-r-0 p-2 text-start">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                    <PaginationFooter
                        pagination={pagination}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        colSpan={columns.length}
                    />
                </table>
            </div>
        </div>
    )
}
