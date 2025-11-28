"use client"
import Navigation from '@/components/Navigation'
import NextImage from '@/components/NextImage'
import { getBlogAsync, selectBlog } from '@/lib/blog/blogSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { customParser } from '@/lib/utils'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const blog = useAppSelector(selectBlog)
    const [publishedAt, setPublishedAt] = useState("")

    useEffect(() => {
        if (params?.id) {
            dispatch(getBlogAsync(params?.id))
        }
    }, [params?.id])

    useEffect(() => {
        if (blog?.updated_at) {
            const date = blog?.updated_at ? new Date(blog?.updated_at) : null;

            if (date) {
                setPublishedAt(date?.toLocaleDateString())
            }
        }
    }, [blog])

    return (
        <Navigation>
            <div className={`w-full px-[1rem] h-full flex flex-col max-w-[90rem] mx-auto mb-[2rem] md:mb-[2.5rem]`}>
                {
                    blog?.banner_image_url && <div className="w-full h-[15rem] md:h-[20rem] lg:h-[25rem] xl:h-[30rem]">
                        <NextImage
                            src={blog?.banner_image_url}
                            width={40}
                            height={40}
                            unoptimized
                            className="object-cover rounded w-full h-full"
                            alt="banner-image-url"
                        />
                    </div>
                }

                <h1 className='text-[1.5rem] md:text-[2rem] font-[700] mt-[2rem]'>{blog?.title}</h1>

                <div className='flex flex-row justify-between items-center mt-[1.5rem]'>
                    <div className='flex items-center justify-center'>
                        <div className="w-[5rem] h-[5rem]">
                            <NextImage
                                src={"/images/author-avatar.svg"}
                                width={40}
                                height={40}
                                unoptimized
                                className="object-cover rounded w-full h-full"
                                alt="Preview"
                            />
                        </div>

                        <div>
                            <h2 className='font-[600] text-[0.875rem]'>{blog?.author?.name}</h2>
                            <div className='flex flex-row gap-x-[0.23rem]'>
                                {
                                    blog?.updated_at && <span className='font-[400] text-[0.875rem]'>{publishedAt}</span>
                                }

                                <span className='text-[0.5rem] font-[400]'>•</span>
                                {
                                    blog?.read_time_minutes && <span className='font-[400] text-[0.875rem]'>{blog?.read_time_minutes} min read</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-x-[0.7rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                            <path d="M5.934 27.7996C6.58592 28.4524 7.36042 28.9701 8.213 29.3227C9.06558 29.6753 9.97942 29.8559 10.902 29.8543C11.8249 29.8559 12.7389 29.6752 13.5917 29.3226C14.4445 28.97 15.2193 28.4524 15.8715 27.7996L19.8459 23.8238L17.8587 21.8365L13.8843 25.8124C13.0923 26.6008 12.0203 27.0435 10.9027 27.0435C9.78522 27.0435 8.71319 26.6008 7.92122 25.8124C7.1321 25.0208 6.68898 23.9486 6.68898 22.8309C6.68898 21.7131 7.1321 20.6409 7.92122 19.8493L11.8971 15.8749L9.90984 13.8877L5.934 17.8621C4.61829 19.181 3.87939 20.9679 3.87939 22.8309C3.87939 24.6938 4.61829 26.4807 5.934 27.7996ZM27.7962 15.8749C29.1112 14.5556 29.8496 12.7689 29.8496 10.9062C29.8496 9.04344 29.1112 7.25668 27.7962 5.93742C26.4773 4.62171 24.6904 3.88281 22.8274 3.88281C20.9645 3.88281 19.1776 4.62171 17.8587 5.93742L13.8843 9.91325L15.8715 11.9005L19.8459 7.92463C20.6379 7.1362 21.7099 6.69356 22.8274 6.69356C23.945 6.69356 25.017 7.1362 25.809 7.92463C26.5981 8.71625 27.0412 9.78841 27.0412 10.9062C27.0412 12.0239 26.5981 13.0961 25.809 13.8877L21.8331 17.8621L23.8203 19.8493L27.7962 15.8749Z" fill="black" />
                            <path d="M11.8956 23.8253L9.90701 21.8381L21.8345 9.91197L23.8217 11.9006L11.8956 23.8253Z" fill="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.32439 4.55469C5.16012 4.55469 4.21631 5.4985 4.21631 6.66277V27.7435C4.21631 28.9078 5.16012 29.8516 6.32439 29.8516H27.4052C28.5694 29.8516 29.5132 28.9078 29.5132 27.7435V6.66277C29.5132 5.4985 28.5694 4.55469 27.4052 4.55469H6.32439ZM11.9751 10.1801C11.983 11.524 10.9771 12.352 9.78336 12.3461C8.65883 12.3402 7.67857 11.4449 7.6845 10.182C7.69044 8.99426 8.62919 8.03969 9.84859 8.06736C11.0858 8.09504 11.983 9.00217 11.9751 10.1801ZM17.2579 14.0576H13.7163H13.7143V26.0874H17.4574V25.8068C17.4574 25.2729 17.457 24.7388 17.4566 24.2046C17.4555 22.7799 17.4542 21.3535 17.4615 19.9292C17.4635 19.5833 17.4792 19.2237 17.5682 18.8936C17.9021 17.6603 19.0109 16.8639 20.2481 17.0597C21.0426 17.184 21.5682 17.6446 21.7895 18.3937C21.926 18.8619 21.9873 19.3659 21.9932 19.8541C22.0092 21.3264 22.0069 22.7987 22.0047 24.2711C22.0039 24.7908 22.003 25.3108 22.003 25.8305V26.0855H25.7581V25.7969C25.7581 25.1617 25.7578 24.5266 25.7574 23.8915C25.7567 22.3041 25.7558 20.7168 25.76 19.1288C25.762 18.4114 25.685 17.7039 25.509 17.0102C25.2462 15.9785 24.7028 15.1247 23.8193 14.5082C23.1928 14.0694 22.505 13.7868 21.7363 13.7552C21.6487 13.7515 21.5605 13.7468 21.4718 13.742C21.0787 13.7207 20.6791 13.6992 20.3033 13.7749C19.2282 13.9904 18.2837 14.4825 17.5701 15.35C17.4872 15.4495 17.4061 15.5506 17.2851 15.7014L17.2579 15.7355V14.0576ZM7.98505 26.0914H11.7104V14.0654H7.98505V26.0914Z" fill="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                            <path d="M24.1392 5.96094H28.0182L19.5436 15.4858L29.5132 28.4471H21.7072L15.593 20.5862L8.59722 28.4471H4.71584L13.7802 18.2592L4.21631 5.96094H12.2206L17.7472 13.1461L24.1392 5.96094ZM22.7777 26.1639H24.9272L11.0527 8.12422H8.74615L22.7777 26.1639Z" fill="black" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 34 34" fill="none">
                            <path d="M30.9183 17.2921C30.9183 9.48292 24.6262 3.15234 16.8644 3.15234C9.10267 3.15234 2.81055 9.48292 2.81055 17.2921C2.81055 24.3495 7.94982 30.1993 14.6685 31.2601V21.3794H11.1001V17.2921H14.6685V14.1769C14.6685 10.6332 16.7667 8.67568 19.9768 8.67568C21.5145 8.67568 23.1227 8.95185 23.1227 8.95185V12.4316H21.3507C19.6049 12.4316 19.0603 13.5216 19.0603 14.6398V17.2921H22.958L22.335 21.3794H19.0603V31.2601C25.779 30.1993 30.9183 24.3498 30.9183 17.2921Z" fill="black" />
                        </svg>
                    </div>
                </div>

                <div className='mt-[1rem] lg:mt-[1.5rem]'>
                    {
                        blog?.image_url && <div className="w-full relative">
                            <div className='h-[28rem]'>
                                <NextImage
                                    src={blog?.image_url}
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="object-cover rounded w-full h-full"
                                    alt="Blog banner"
                                />
                            </div>
                        </div>
                    }

                    {
                        blog?.sections && (
                            <div className="w-full flex flex-col gap-y-4 mt-[1rem]">
                                {
                                    blog.sections.map((section, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 flex flex-col gap-y-[1rem]"
                                        >
                                            {section.title && (
                                                <h2 className="font-[700] text-base lg:text-[1.125rem] my-[0.7rem]">
                                                    {section.title}
                                                </h2>
                                            )}

                                            {section.paragraphs?.map((p, pIdx) => (
                                                <div
                                                    key={pIdx}
                                                    className="text-[0.875rem] lg:text-base text-gray-800 mb-2 break-words"
                                                >
                                                    {customParser(p.text)}
                                                </div>
                                            ))}

                                            {section.images?.map((img, imgIdx) => (
                                                <div key={imgIdx?.toString()} className='flex flex-col gap-y-[0.5rem]'>
                                                    {img.image_url && <img
                                                        key={imgIdx}
                                                        src={img.image_url}
                                                        alt={img.alt || `section-image-${imgIdx}`}
                                                        className="w-full h-auto object-cover rounded mt-2"
                                                    />
                                                    }

                                                    <div className='border-l border-black'>
                                                        <p>{img?.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </Navigation>
    )
}
