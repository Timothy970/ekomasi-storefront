import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function blogs() {
  return (
    <Navigation>
      <div className='w-full flex items-center justify-center flex-col  mt-[2rem] md:mt-[2.5rem]'>
        <div className='flex gap-[1rem]'>
          <h2 className='text-[2rem] font-[700] md:text-[3rem]'>Adenzo </h2>
          <h2 className='text-[2rem] font-[200] md:text-[3rem] text-[#E8298A]'>Blogs</h2>
        </div>

        <div className='mt-[2.5rem] w-full text-center max-w-[48rem] px-[1rem] md:px-[3rem]'>
          <p className='text-[1.125rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
        </div>

        <div className='w-full flex items-center justify-center mt-[2rem] gap-x-[1rem] px-[1rem] md:px-[3rem]'>
          <Input className='w-ful max-w-[22rem] h-[2.5rem]' />

          <Button className='h-[2.5rem]'>
            Sign Up
          </Button>
        </div>

        <div className='w-full flex items-center justify-center mt-[1rem] px-[1rem] md:px-[3rem]'>
          <p className='text-[0.75rem] text-center'>By clicking Sign Up you're confirming that you agree with our <Link href="/terms-&-conditions">Terms and Conditions.</Link></p>
        </div>

        <div className="w-full h-[20rem] lg:h-[40rem] relative mt-[2.5rem]">
          <Image
            src="/images/blogs.jpg"
            alt="Logo"
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h2>Latest Blogs</h2>

          <div>
            
          </div>
        </div>



      </div>
    </Navigation>
  )
}
