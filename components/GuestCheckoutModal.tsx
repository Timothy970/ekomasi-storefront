import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
interface GuestCheckoutModal {
    setOpenGuestCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>
    openGuestCheckoutModal: boolean
}
export default function GuestCheckoutModal({ openGuestCheckoutModal, setOpenGuestCheckoutModal }: GuestCheckoutModal) {
    const router = useRouter()

    if (!openGuestCheckoutModal) {
        return <></>
    }

    const handleLogin = () => {
        const redirectUrl = encodeURIComponent("/checkout/member")
        router.push(`/user/login?redirect=${redirectUrl}`)
    }

    const handleCreateAccount = () => {
        const redirectUrl = encodeURIComponent("/checkout/member")

        router.push(`/user/signup?redirect=${redirectUrl}`)
    }

    return (
        <div className='absolute inset-0 z-[60] h-screen w-screen flex justify-center items-center'>
            <div className='absolute bg-black/50 z-[65] h-screen w-screen' onClick={() => setOpenGuestCheckoutModal(false)}>
                <div className='flex p-[1rem] pt-[3rem] w-full justify-end'>
                    <X className='text-white' />
                </div>
            </div>
            <div className='bg-white flex flex-col items-center justify-center p-[3rem] m-[1rem] overflow-y-scroll z-[70]'>
                <div className='mb-[2rem] border-b border-black pb-[2rem]'>
                    <div className='text-center flex flex-col gap-y-[1rem] p-2 max-w-[24rem]'>
                        <h2 className='font-semibold text-[1.5rem]'>Choose How You Would Like To Check out</h2>
                        <p className='font-bold text-[1.125rem]'>Checkout as Member</p>

                        <ul className='list-disc flex justify-center items-center flex-col gap-y-[0.62rem]'>
                            <li className='mt-[1.5rem] text-[1.125rem]'>Check out as a member and get free shipping on orders $50+</li>
                            <li className='text-[1.125rem]'>Get early access to sales & special drops</li>
                            <li className='text-[1.125rem]'>Track your orders</li>
                        </ul>
                    </div>

                    <div className='mt-[2rem] flex flex-col gap-y-[1rem]'>
                        <Button onClick={() => handleLogin()} className='h-[3rem] rounded-[1.5rem] flex items-center justify-center gap-x-[0.75rem]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                <path d="M9.49805 13.501L14.498 9.50098L9.49805 5.50098V8.50098H0.498047V10.501H9.49805V13.501Z" fill="white" />
                                <path d="M11.4991 0.500034C10.3166 0.496756 9.14523 0.728145 8.05282 1.1808C6.96041 1.63345 5.96867 2.29837 5.13507 3.13703L6.54907 4.55103C7.87107 3.22903 9.62907 2.50003 11.4991 2.50003C13.3691 2.50003 15.1271 3.22903 16.4491 4.55103C17.7711 5.87303 18.5001 7.63103 18.5001 9.50103C18.5001 11.371 17.7711 13.129 16.4491 14.451C15.1271 15.773 13.3691 16.502 11.4991 16.502C9.62907 16.502 7.87107 15.773 6.54907 14.451L5.13507 15.865C6.83407 17.565 9.09407 18.502 11.4991 18.502C13.9041 18.502 16.1641 17.565 17.8631 15.865C19.5631 14.166 20.5001 11.906 20.5001 9.50103C20.5001 7.09604 19.5631 4.83603 17.8631 3.13703C17.0295 2.29837 16.0377 1.63345 14.9453 1.1808C13.8529 0.728145 12.6815 0.496756 11.4991 0.500034Z" fill="white" />
                            </svg>
                            <span>Login</span>
                        </Button>

                        <Button onClick={() => handleCreateAccount()} className='h-[3rem] rounded-[1.5rem] flex items-center justify-center gap-x-[0.75rem]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <path d="M11 2.5C10.121 2.5 9.26168 2.74694 8.5308 3.2096C7.79991 3.67226 7.23026 4.32985 6.89387 5.09923C6.55748 5.8686 6.46946 6.7152 6.64095 7.53196C6.81244 8.34872 7.23574 9.09897 7.8573 9.68782C8.47887 10.2767 9.27079 10.6777 10.1329 10.8401C10.9951 11.0026 11.8887 10.9192 12.7008 10.6005C13.5129 10.2819 14.2071 9.74219 14.6954 9.04977C15.1838 8.35735 15.4444 7.54329 15.4444 6.71053C15.4444 5.59383 14.9762 4.52286 14.1427 3.73323C13.3092 2.94361 12.1787 2.5 11 2.5ZM11 9.23684C10.4726 9.23684 9.95701 9.08868 9.51848 8.81108C9.07995 8.53349 8.73815 8.13893 8.53632 7.67731C8.33449 7.21568 8.28168 6.70772 8.38457 6.21767C8.48747 5.72761 8.74144 5.27746 9.11438 4.92415C9.48732 4.57084 9.96248 4.33023 10.4798 4.23275C10.997 4.13527 11.5332 4.1853 12.0205 4.37651C12.5078 4.56773 12.9242 4.89153 13.2173 5.30698C13.5103 5.72243 13.6667 6.21087 13.6667 6.71053C13.6667 7.38055 13.3857 8.02313 12.8856 8.4969C12.3855 8.97068 11.7072 9.23684 11 9.23684ZM19 18.5V17.6579C19 16.0945 18.3444 14.5952 17.1776 13.4897C16.0107 12.3842 14.428 11.7632 12.7778 11.7632H9.22222C7.57199 11.7632 5.98934 12.3842 4.82245 13.4897C3.65555 14.5952 3 16.0945 3 17.6579V18.5H4.77778V17.6579C4.77778 16.5412 5.24603 15.4702 6.07953 14.6806C6.91302 13.891 8.04348 13.4474 9.22222 13.4474H12.7778C13.9565 13.4474 15.087 13.891 15.9205 14.6806C16.754 15.4702 17.2222 16.5412 17.2222 17.6579V18.5H19Z" fill="white" />
                            </svg>
                            <span>Create account</span>
                        </Button>
                    </div>
                </div>

                <div className='w-full flex flex-col justify-center items-center gap-y-[1rem] max-w-[24rem]'>
                    <h2 className='font-bold text-[1.125rem]'>Check out as a Guest</h2>
                    <p className='text-center text-[1.125rem]'>You can create a free Adenzo Comfies Member Profile at any point during the checkout process.</p>

                    <Button onClick={() => router.push("/checkout/guest")} className='h-[3rem] rounded-[1.5rem] w-full flex items-center justify-center gap-x-[0.75rem]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M11 2.5C10.121 2.5 9.26168 2.74694 8.5308 3.2096C7.79991 3.67226 7.23026 4.32985 6.89387 5.09923C6.55748 5.8686 6.46946 6.7152 6.64095 7.53196C6.81244 8.34872 7.23574 9.09897 7.8573 9.68782C8.47887 10.2767 9.27079 10.6777 10.1329 10.8401C10.9951 11.0026 11.8887 10.9192 12.7008 10.6005C13.5129 10.2819 14.2071 9.74219 14.6954 9.04977C15.1838 8.35735 15.4444 7.54329 15.4444 6.71053C15.4444 5.59383 14.9762 4.52286 14.1427 3.73323C13.3092 2.94361 12.1787 2.5 11 2.5ZM11 9.23684C10.4726 9.23684 9.95701 9.08868 9.51848 8.81108C9.07995 8.53349 8.73815 8.13893 8.53632 7.67731C8.33449 7.21568 8.28168 6.70772 8.38457 6.21767C8.48747 5.72761 8.74144 5.27746 9.11438 4.92415C9.48732 4.57084 9.96248 4.33023 10.4798 4.23275C10.997 4.13527 11.5332 4.1853 12.0205 4.37651C12.5078 4.56773 12.9242 4.89153 13.2173 5.30698C13.5103 5.72243 13.6667 6.21087 13.6667 6.71053C13.6667 7.38055 13.3857 8.02313 12.8856 8.4969C12.3855 8.97068 11.7072 9.23684 11 9.23684ZM19 18.5V17.6579C19 16.0945 18.3444 14.5952 17.1776 13.4897C16.0107 12.3842 14.428 11.7632 12.7778 11.7632H9.22222C7.57199 11.7632 5.98934 12.3842 4.82245 13.4897C3.65555 14.5952 3 16.0945 3 17.6579V18.5H4.77778V17.6579C4.77778 16.5412 5.24603 15.4702 6.07953 14.6806C6.91302 13.891 8.04348 13.4474 9.22222 13.4474H12.7778C13.9565 13.4474 15.087 13.891 15.9205 14.6806C16.754 15.4702 17.2222 16.5412 17.2222 17.6579V18.5H19Z" fill="white" />
                        </svg>
                        <span>Continue as Guest</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
