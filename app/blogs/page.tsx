"use client"
import BlogCard from '@/components/BlogCard'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getBlogsAsync, selectBlogs } from '@/lib/blog/blogSlice'
import { subscribeAsync } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { triggerToast } from '../utils/toastUtils'
import { ToastType } from '@/lib/features/toast/toastSlice'

export default function Blogs() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs)
  const [email, setEmail] = React.useState("")
  const [emailError, setEmailError] = React.useState("")

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => {
        setEmailError("")
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailError])

  const handleSignUp = async () => {
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")
    await dispatch(subscribeAsync({
      email, handleSubscribe: (message: string, type: ToastType) => {
        if (type === "success") {
          setEmail("")
        }
        triggerToast(message, type)
      }
    }))
  }


  useEffect(() => {
    dispatch(getBlogsAsync(""))
  }, [dispatch])

  return (
    <Navigation>
      <div className='w-full flex items-center justify-center flex-col  mt-[2rem] md:mt-[2.5rem] mb-[2rem] md:mb-[2.5rem]'>
        <div className='w-full mx-auto flex items-center justify-center flex-col max-w-[90rem]'>
          <div className='flex gap-[1rem]'>
            <h2 className='text-[2rem] font-[700] md:text-[3rem]'>Adenzo </h2>
            <h2 className='text-[2rem] font-[200] md:text-[3rem] text-[#E8298A]'>Blogs</h2>
          </div>

          <div className='mt-[2.5rem] w-full text-center max-w-[48rem] px-[1rem] md:px-[3rem]'>
            <p className='text-[1.125rem]'>Discover the latest trends, tips, and insights from the world of fashion and lifestyle. Our blog is dedicated to bringing you expert advice, product recommendations, and inspiring stories to elevate your shopping experience.</p>
          </div>

          <div className='w-full flex flex-col items-center justify-center mt-[2rem] gap-x-[1rem] px-[1rem] md:px-[3rem]'>
            <div className="flex w-full gap-x-[0.75rem] items-center justify-center">

              <Input className={`w-ful max-w-[22rem] h-[2.5rem] ${emailError ? "border-red-500" : ""}`} placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className='h-[2.5rem] text-[0.875rem] text-base'
                onClick={handleSignUp}>
                Subscribe
              </Button>
            </div>

            {emailError && (
              <span className="text-red-500 text-[0.75rem]">
                {emailError}
              </span>
            )}
          </div>

          <div className='w-full flex items-center justify-center mt-[1rem] px-[1rem] md:px-[3rem]'>
            <p className='text-[0.75rem] text-center'>By clicking Sign Up you're confirming that you agree with our <Link className='text-blue-600 underline' href="/terms-&-conditions">Terms and Conditions.</Link></p>
          </div>
        </div>

        <div className="w-full h-[20rem] lg:h-[40rem] relative mt-[2.5rem]">
          <Image
            src="/images/blogs.jpg"
            alt=""
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div className='w-full mx-auto flex items-center justify-center flex-col max-w-[90rem]'>
          <div className='flex flex-col items-start justify-start w-full px-[1rem] md:px-[3rem] mt-[2rem] md:mt-[2.5rem]'>
            <h2 className='text-[1.5rem] md:text-[2rem] text-start'>Latest blog posts</h2>

            {
              blogs && blogs?.length > 0 ? <div className='mt-[2rem] md:mt-[2.5rem]'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[2rem] md:gap-y-[2.5rem] gap-x-[1rem] md:gap-x-[1.5rem]'>
                  {
                    blogs?.map((blog) => {
                      return <BlogCard key={blog?.blog_id} blog={blog} />
                    })
                  }

                </div>
              </div> : <div className='flex items-center justify-center'>
                <p>No blogs to show.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </Navigation>
  )
}
