"use client"
import Navigation from '@/components/Navigation'
import NextImage from '@/components/NextImage'
import NoImage from '@/components/NoImage'
import { getBlogAsync, selectBlog } from '@/lib/blog/blogSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { customParser } from '@/lib/utils'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
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
                {/* 1. Read time and avatar things first */}
                <div className='flex flex-row justify-between items-center mt-[1.5rem]'>
                    <div className='flex items-center justify-center'>
                        <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] bg-gray-100 rounded-full overflow-hidden mr-3">
                            <NextImage
                                src={blog?.author?.avatar || "/images/author-avatar.svg"}
                                width={40}
                                height={40}
                                unoptimized
                                className="object-cover w-full h-full"
                                alt="Author Avatar"
                            />
                        </div>

                        <div>
                            <h2 className='font-[600] text-[0.875rem]'>{blog?.author?.name || "Ekomasi Author"}</h2>
                            <div className='flex flex-row gap-x-[0.23rem] items-center'>
                                {
                                    blog?.updated_at && <span className='font-[400] text-[0.875rem] text-gray-500'>{publishedAt}</span>
                                }

                                <span className='text-[0.5rem] font-[400] text-gray-500'>•</span>
                                {
                                    blog?.read_time_minutes && <span className='font-[400] text-[0.875rem] text-gray-500'>{blog?.read_time_minutes} min read</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. blog title */}
                <h1 className='text-[1.8rem] md:text-[2.5rem] font-[700] mt-[2rem] leading-tight'>{blog?.title}</h1>

                {/* 3. blog image (main banner image) */}
                <div className='mt-[1.5rem]'>
                    {
                        (() => {
                            if (blog?.banner_image_url) {
                                return (
                                    <div className="w-full relative">
                                        <div className='h-[20rem] md:h-[30rem] lg:h-[35rem] w-full'>
                                            <NextImage
                                                src={blog?.banner_image_url}
                                                width={1200}
                                                height={400}
                                                unoptimized
                                                className="object-cover rounded-xl w-full h-full"
                                                alt="Blog banner"
                                            />
                                        </div>
                                    </div>
                                );
                            } else if (blog?.image_url) {
                                return (
                                    <div className="w-full relative">
                                        <div className='h-[20rem] md:h-[30rem] lg:h-[35rem] w-full'>
                                            <NextImage
                                                src={blog?.image_url}
                                                width={1200}
                                                height={600}
                                                unoptimized
                                                className="object-cover rounded-xl w-full h-full"
                                                alt="Blog banner"
                                            />
                                        </div>
                                    </div>
                                );
                            } else {
                                return <NoImage />;
                            }
                        })()
                    }
                </div>

                {/* 4. blog description */}
                {blog?.description && (
                    <div className='mt-[2rem] text-[1rem] md:text-[1.125rem] text-gray-700 leading-relaxed max-w-[60rem]'>
                        <p>{blog.description}</p>
                    </div>
                )}

                {/* 5. Sections */}
                <div className='mt-[2.5rem] lg:mt-[3rem]'>
                    {
                        blog?.sections && (
                            <div className="w-full flex flex-col gap-y-12">
                                {
                                    blog.sections.map((section, idx) => (
                                        <div
                                            key={blog.blog_id}
                                            className="flex flex-col gap-y-[1.5rem]"
                                        >
                                            {/* Section Title (Optional) */}
                                            {section.title && (
                                                <h2 className="font-[700] text-[1.4rem] lg:text-[1.8rem] my-[0.5rem] text-gray-900">
                                                    {section.title}
                                                </h2>
                                            )}

                                            {/* First Section Image (If exists) */}
                                            {section.images?.[0]?.image_url && (
                                                <div className="w-full max-h-[35rem] overflow-hidden rounded-lg">
                                                    <img
                                                        src={section.images[0].image_url}
                                                        alt={section.images[0].alt || `section-image-${idx}-0`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    {section.images[0].caption && (
                                                        <div className='border-l-2 border-gray-400 pl-3 mt-2 italic text-gray-600 text-sm'>
                                                            <p>{section.images[0].caption}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Paragraphs with interspersed remaining images */}
                                            <div className="flex flex-col gap-y-6">
                                                {section.paragraphs?.map((p, pIdx) => {
                                                    // Start interspersing from the second image (index 1)
                                                    const interspersedImage = section.images && section.images.length > 1
                                                        ? section.images[pIdx + 1]
                                                        : null;

                                                    return (
                                                        <React.Fragment key={`paragraph-${pIdx}`}>
                                                            <div className="flex flex-col gap-y-3">
                                                                {p.title && (
                                                                    <h3 className="font-[600] text-[1.125rem] lg:text-[1.25rem] text-gray-800">
                                                                        {p.title}
                                                                    </h3>
                                                                )}
                                                                <div
                                                                    className="text-base lg:text-[1.1rem] text-gray-800 leading-relaxed break-words quill-content"
                                                                >
                                                                    {customParser(p.text)}
                                                                </div>
                                                            </div>

                                                            {/* Render the interspersed image if it exists */}
                                                            {interspersedImage?.image_url && (
                                                                <div className="w-full max-h-[30rem] overflow-hidden rounded-lg my-4">
                                                                    <img
                                                                        src={interspersedImage.image_url}
                                                                        alt={interspersedImage.alt || `section-image-${idx}-${pIdx + 1}`}
                                                                        className="w-full h-full object-cover rounded-lg"
                                                                    />
                                                                    {interspersedImage.caption && (
                                                                        <div className='border-l-2 border-gray-400 pl-3 mt-2 italic text-gray-600 text-sm'>
                                                                            <p>{interspersedImage.caption}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>

                                            {/* If there are more images than paragraphs (excluding the first image), render them at the end of the section */}
                                            {section.images && section.images.length > (section.paragraphs?.length || 0) + 1 && (
                                                <div className="flex flex-col gap-y-6">
                                                    {section.images.slice((section.paragraphs?.length || 0) + 1).map((img, imgIdx) => (
                                                        <div key={`extra-${imgIdx}`} className="w-full max-h-[30rem] overflow-hidden rounded-lg">
                                                            <img
                                                                src={img.image_url}
                                                                alt={img.alt || `extra-image-${imgIdx}`}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            {img.caption && (
                                                                <div className='border-l-2 border-gray-400 pl-3 mt-2 italic text-gray-600 text-sm'>
                                                                    <p>{img.caption}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
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
