import Image from 'next/image'
import React from 'react'

export default function ProductFeatureSection() {
    return (
        <div className='px-[1rem] lg:px-[3rem] mb-[2rem] lg:mb-[2.5rem] flex items-center justify-center flex-col'>
            <h2 className='text-[2rem] lg:text-[3rem] font-[700] text-center block max-w-xl lg:leading-[3.78rem]'>Discover Our Stylish and Comfortable Strollers for Your Little Ones</h2>

            <div className='mt-[1.5rem] flex flex-col items-center justify-center'>
                <span className='text-[1.125rem] font-[400]'>-5-point harness system</span>
                <span className='text-[1.125rem] font-[400]'>-Non-slip base</span>
            </div>

            <div className='flex flex-col lg:flex-row w-full items-center mt-[2.5rem] lg:gap-x-[1rem] lg:mt-[5rem]'>
                <div className='flex flex-col items-center gap-y-[4rem] w-full'>
                    <div className='flex flex-col items-center w-full gap-y-[1rem] justify-center max-w-lg lg:max-w-[20rem] text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.46 10.24L35.18 9.74C34.8188 9.13538 34.3094 8.63286 33.7 8.28L20.28 0.54C19.6724 0.1875 18.9826 0.00124 18.28 0H17.7C16.9974 0.00124 16.3076 0.1875 15.7 0.54L2.28 8.3C1.67394 8.65052 1.17052 9.15394 0.82 9.76L0.54 10.26C0.1875 10.8677 0.00124 11.5575 0 12.26V27.76C0.00124 28.4626 0.1875 29.1524 0.54 29.76L0.82 30.26C1.17958 30.859 1.68098 31.3604 2.28 31.72L15.72 39.46C16.3246 39.8198 17.0164 40.0066 17.72 40H18.28C18.9826 39.9988 19.6724 39.8126 20.28 39.46L33.7 31.7C34.312 31.3574 34.8174 30.852 35.16 30.24L35.46 29.74C35.8082 29.1306 35.9942 28.442 36 27.74V12.24C35.9988 11.5375 35.8126 10.8477 35.46 10.24ZM17.7 4H18.28L30 10.76L18 17.68L6 10.76L17.7 4ZM20 35L31.7 28.24L32 27.74V14.22L20 21.16V35Z" fill="black" />
                        </svg>

                        <h2 className='text-[1.5rem] font-[700]'>Unmatched Durability and Safety Features for Peace of Mind</h2>
                        <p className='font-[400]'>Enjoy hassle-free assembly with our user-friendly design, perfect for busy parents.</p>
                    </div>

                    <div className='flex flex-col items-center w-full gap-y-[1rem] max-w-lg lg:max-w-[20rem] justify-center text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.46 10.24L35.18 9.74C34.8188 9.13538 34.3094 8.63286 33.7 8.28L20.28 0.54C19.6724 0.1875 18.9826 0.00124 18.28 0H17.7C16.9974 0.00124 16.3076 0.1875 15.7 0.54L2.28 8.3C1.67394 8.65052 1.17052 9.15394 0.82 9.76L0.54 10.26C0.1875 10.8677 0.00124 11.5575 0 12.26V27.76C0.00124 28.4626 0.1875 29.1524 0.54 29.76L0.82 30.26C1.17958 30.859 1.68098 31.3604 2.28 31.72L15.72 39.46C16.3246 39.8198 17.0164 40.0066 17.72 40H18.28C18.9826 39.9988 19.6724 39.8126 20.28 39.46L33.7 31.7C34.312 31.3574 34.8174 30.852 35.16 30.24L35.46 29.74C35.8082 29.1306 35.9942 28.442 36 27.74V12.24C35.9988 11.5375 35.8126 10.8477 35.46 10.24ZM17.7 4H18.28L30 10.76L18 17.68L6 10.76L17.7 4ZM20 35L31.7 28.24L32 27.74V14.22L20 21.16V35Z" fill="black" />
                        </svg>

                        <h2 className='text-[1.5rem] font-[700]'>Effortless Assembly: Set Up Your Chair in Minutes</h2>
                        <p className='font-[400]'>Choose from a variety of colors and styles that complement your home.</p>
                    </div>
                </div>

                <div className='relative h-[33rem] w-full mt-[2rem] lg:mt-[3rem]'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>

                <div className='flex flex-col items-center gap-y-[4rem] w-full mt-[2rem] lg:mt-[3rem]'>
                    <div className='flex flex-col items-center w-full gap-y-[1rem] justify-center max-w-lg lg:max-w-[20rem] text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.46 10.24L35.18 9.74C34.8188 9.13538 34.3094 8.63286 33.7 8.28L20.28 0.54C19.6724 0.1875 18.9826 0.00124 18.28 0H17.7C16.9974 0.00124 16.3076 0.1875 15.7 0.54L2.28 8.3C1.67394 8.65052 1.17052 9.15394 0.82 9.76L0.54 10.26C0.1875 10.8677 0.00124 11.5575 0 12.26V27.76C0.00124 28.4626 0.1875 29.1524 0.54 29.76L0.82 30.26C1.17958 30.859 1.68098 31.3604 2.28 31.72L15.72 39.46C16.3246 39.8198 17.0164 40.0066 17.72 40H18.28C18.9826 39.9988 19.6724 39.8126 20.28 39.46L33.7 31.7C34.312 31.3574 34.8174 30.852 35.16 30.24L35.46 29.74C35.8082 29.1306 35.9942 28.442 36 27.74V12.24C35.9988 11.5375 35.8126 10.8477 35.46 10.24ZM17.7 4H18.28L30 10.76L18 17.68L6 10.76L17.7 4ZM20 35L31.7 28.24L32 27.74V14.22L20 21.16V35Z" fill="black" />
                        </svg>

                        <h2 className='text-[1.5rem] font-[700]'>Unmatched Durability and Safety Features for Peace of Mind</h2>
                        <p className='font-[400]'>Enjoy hassle-free assembly with our user-friendly design, perfect for busy parents.</p>
                    </div>

                    <div className='flex flex-col items-center w-full gap-y-[1rem] max-w-lg lg:max-w-[20rem] justify-center text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.46 10.24L35.18 9.74C34.8188 9.13538 34.3094 8.63286 33.7 8.28L20.28 0.54C19.6724 0.1875 18.9826 0.00124 18.28 0H17.7C16.9974 0.00124 16.3076 0.1875 15.7 0.54L2.28 8.3C1.67394 8.65052 1.17052 9.15394 0.82 9.76L0.54 10.26C0.1875 10.8677 0.00124 11.5575 0 12.26V27.76C0.00124 28.4626 0.1875 29.1524 0.54 29.76L0.82 30.26C1.17958 30.859 1.68098 31.3604 2.28 31.72L15.72 39.46C16.3246 39.8198 17.0164 40.0066 17.72 40H18.28C18.9826 39.9988 19.6724 39.8126 20.28 39.46L33.7 31.7C34.312 31.3574 34.8174 30.852 35.16 30.24L35.46 29.74C35.8082 29.1306 35.9942 28.442 36 27.74V12.24C35.9988 11.5375 35.8126 10.8477 35.46 10.24ZM17.7 4H18.28L30 10.76L18 17.68L6 10.76L17.7 4ZM20 35L31.7 28.24L32 27.74V14.22L20 21.16V35Z" fill="black" />
                        </svg>

                        <h2 className='text-[1.5rem] font-[700]'>Effortless Assembly: Set Up Your Chair in Minutes</h2>
                        <p className='font-[400]'>Choose from a variety of colors and styles that complement your home.</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-y-[1.5rem] lg:flex-row mt-[2rem] lg:mt-[3rem] gap-x-[5rem] items-center'>
                <div className='w-full flex justify-center text-center lg:text-start gap-y-[2rem] flex-col max-w-lg lg:max-w-full'>
                    <h2 className='text-[2.25rem] font-[700]'>Incredibly easy fold</h2>
                    <p>The Jogger Stroller - XCEL-R8 standout feature is the one-hand one-second fold, which allows parents to fold and unfold the stroller with ease. It also boasts the world’s first foldable cot on a compact stroller. The generous shoulder strap and foldable bumper bar makes it incredibly easy to carry the stroller wherever you go.</p>
                </div>

                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>
            </div>

            <div className='w-full flex flex-col gap-y-[1.5rem] mt-[2rem] lg:mt-[3rem] gap-x-[5rem] items-center lg:flex-row-reverse'>
                <div className='w-full flex justify-center text-center lg:text-start gap-y-[2rem] flex-col max-w-lg lg:max-w-full'>
                    <h2 className='text-[2.25rem] font-[700]'>Incredibly easy fold</h2>
                    <p>The Jogger Stroller - XCEL-R8 standout feature is the one-hand one-second fold, which allows parents to fold and unfold the stroller with ease. It also boasts the world’s first foldable cot on a compact stroller. The generous shoulder strap and foldable bumper bar makes it incredibly easy to carry the stroller wherever you go.</p>
                </div>

                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>
            </div>

            <div className='w-full flex mt-[2rem] lg:mt-[3rem] gap-x-[2rem] flex-row'>
                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>
            </div>

            <div className='w-full flex flex-col gap-y-[1.5rem] lg:flex-row mt-[2rem] lg:mt-[3rem] gap-x-[5rem] items-center'>
                <div className='w-full flex justify-center text-center lg:text-start gap-y-[2rem] flex-col max-w-lg lg:max-w-full'>
                    <h2 className='text-[2.25rem] font-[700]'>Incredibly easy fold</h2>
                    <p>The Jogger Stroller - XCEL-R8 standout feature is the one-hand one-second fold, which allows parents to fold and unfold the stroller with ease. It also boasts the world’s first foldable cot on a compact stroller. The generous shoulder strap and foldable bumper bar makes it incredibly easy to carry the stroller wherever you go.</p>
                </div>

                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>
            </div>

            <div className='relative h-[40rem] w-full mt-[2rem] lg:mt-[3rem]'>
                <Image
                    src="/images/featured.jpg"
                    alt="otp"
                    fill
                    priority
                    unoptimized
                    className="object-cover h-full w-full  mx-auto"
                />
            </div>

            <div className='w-full flex flex-col mt-[2rem] lg:mt-[3rem] gap-x-[2rem] md:flex-row gap-y-[2rem]'>
                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>

                <div className='relative h-[40rem] w-full'>
                    <Image
                        src="/images/featured.jpg"
                        alt="otp"
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full  mx-auto"
                    />
                </div>
            </div>
        </div>
    )
}
