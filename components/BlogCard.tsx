"use client"
import { Content } from '@/lib/features/types'
import { truncateText } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function BlogCard({ blog }: { blog: Content }) {
    const formattedDate = blog?.created_at
        ? new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }) : "";
    const shortDescription = truncateText(blog?.description ?? "", 100);


    return (
        <Link href={`/blogs/${blog?.blog_id}`} className='w-full flex flex-col gap-y-[1.5rem]'>
            {
                blog?.banner_image_url && <div className="w-full h-[15rem] lg:h-[18rem] relative">
                    <Image
                        src={blog?.banner_image_url}
                        alt=""
                        fill
                        unoptimized
                        priority
                        className="object-cover"
                    />
                </div>
            }

            <div className='flex flex-col'>
                <h3 className='text-[1.5rem] font-[700]'>{blog?.title}</h3>
                <p className='text-[0.875rem] md:text-base'>{shortDescription}</p>

                <div className='mt-[1.5rem] flex gap-x-[1rem]'>
                    <div className="w-[3rem] h-[3rem] rounded-full relative">
                        <Image
                            src={blog?.author?.avatar ? blog?.author?.avatar : "/images/blogs.jpg"}
                            alt="avatar"
                            fill
                            unoptimized
                            priority
                            className="object-cover rounded-full"
                        />
                    </div>

                    <div className='flex flex-col gap-[0.3rem]'>
                        {
                            blog?.author?.name && <span className='text-[0.875rem] font-[600]'>{blog?.author?.name}</span>
                        }

                        <div className='flex flex-row gap-x-[0.5rem] items-center justify-center'>
                            <span className='font-[400]'>{formattedDate}</span>
                            <span>
                                <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.196 4.41294C1.584 4.41294 1.062 4.20294 0.630001 3.78294C0.210001 3.35094 5.96046e-07 2.82894 5.96046e-07 2.21694C5.96046e-07 1.59294 0.210001 1.07094 0.630001 0.650937C1.062 0.218937 1.584 0.00293696 2.196 0.00293696C2.82 0.00293696 3.348 0.218937 3.78 0.650937C4.212 1.07094 4.428 1.59294 4.428 2.21694C4.428 2.82894 4.212 3.35094 3.78 3.78294C3.348 4.20294 2.82 4.41294 2.196 4.41294Z" fill="black" />
                                </svg>

                            </span>
                            <span>{blog?.read_time_minutes} min read</span>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
