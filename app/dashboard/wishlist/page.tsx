"use client"
import { triggerToast } from '@/app/utils/toastUtils'
import DashboardLayout from '@/components/AppLayout/DashboardLayout'
import Navigation from '@/components/Navigation'
import NowTrending from '@/components/NowTrending'
import { Button } from '@/components/ui/button'
import WishLists from '@/components/WishLists'
import type { ShareWishListPayload, WishList } from '@/lib/features/types'
import { selectUserToken } from '@/lib/features/user/userSlice'
import { deleteProductFromWishList } from '@/lib/features/wishlist/wishlistAPI'
import { getWishListsAsync, selectWishLists, shareWishlistAsync } from '@/lib/features/wishlist/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import ShareWishlistModal from '@/components/ShareWishlistModal'
import { useShareWishlistModal } from '@/app/ClientLayout'

export default function WishList() {
  const { isShareWishlistModalOpen, setShareWishlistModalOpen } = useShareWishlistModal();
  const wishList = useAppSelector(selectWishLists)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectUserToken)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.replace("/")
    }
  }, [token, router])

  const refetchWishList = () => {
    if (token) {
      dispatch(getWishListsAsync(token));
    }
  };

  const handleRemoveWishlist = async (id: string) => {
    try {
      const response = await deleteProductFromWishList(id);

      if (response?.status_code == 200 || response?.status_code == 201) {
        triggerToast("Product removed successfully.", "success");
        refetchWishList();
      } else {
        triggerToast("Failed to remove product from wishlist.", "error");
      }
    } catch (error) {
      triggerToast("An error occurred while removing the product.", "error");
    }
  };

  const handleRemoveAll = async () => {
    if (!wishList?.length) {
      triggerToast("No wishlists to clear.", "error");
      return;
    }

    const allProducts = wishList.flatMap((wl: WishList) => wl.products || []);

    if (!allProducts.length) {
      triggerToast("No products to remove.", "error");
      return;
    }

    triggerToast("Removing all wishlist items...", "info");

    try {
      for (const product of allProducts) {
        if (product.product_id) {
          await handleRemoveWishlist(product.product_id);
        }
      }

      triggerToast("All wishlist items removed successfully.", "success");
      refetchWishList();
    } catch (error) {
      triggerToast("Failed to remove some wishlist items.", "error");
    }
  };

  const handleShareWishlist = async (email: string, message: string, fullNames: string) => {
    const data: ShareWishListPayload = {
      email,
      message,
      sender_name: fullNames
    }

    try {
      await dispatch(shareWishlistAsync({ data, refetchWishLists }));
    } catch (error) {
      refetchWishList();
      triggerToast("An error occurred while sharing the wishlist.", "error");
    }
  }

  const refetchWishLists = (isSuccess: boolean): void => {
    refetchWishList();
    if (isSuccess) {
      triggerToast("Wishlist shared successfully.", "success");
    } else {
      triggerToast("Failed to share wishlist.", "error");
    }
  }

  return (
    <Navigation>
      <DashboardLayout>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-full bg-[rgba(232,41,138,0.25)] h-[2.5rem] text-center flex justify-center items-center'>
            <p className='text-[0.875rem]'>Our Big Little Event is now on | Shop up to 40% off</p>
          </div>

          <div className='mt-[2rem] w-full max-w-[90rem]'>
            <div className='w-full flex items-center justify-between flex-col md:flex-row'>
              <h2 className='text-[1.25rem] md:text-[3rem]'>Wishlist</h2>

              {
                wishList && wishList[0]?.products?.length && <div className='flex gap-x-[1rem] w-full justify-center md:justify-end items-center mx-auto mt-[1rem] md:mt-[1rem]'>
                  <div className='relative'>
                    <Button
                      disabled={wishList?.length == 0}
                      className='bg-[rgba(232,41,138,0.25)] border text-[0.875rem] border-[rgba(232,41,138,0.25)] text-custom-black h-[2.5rem] w-[10rem] flex gap-x-[0.75rem] md:rounded-[0.5rem]'
                      onClick={() => setShareWishlistModalOpen(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M3.5001 13.0015C4.3752 12.9966 5.21688 12.6649 5.8601 12.0715L12.1201 15.6515C12.0404 15.9278 12 16.214 12.0001 16.5015C11.9937 17.3131 12.2671 18.1021 12.7743 18.7356C13.2815 19.3692 13.9915 19.8086 14.7848 19.9799C15.5781 20.1513 16.4061 20.044 17.1296 19.6763C17.8531 19.3085 18.4277 18.7027 18.7568 17.9608C19.0859 17.219 19.1493 16.3864 18.9363 15.6032C18.7234 14.8201 18.2471 14.1343 17.5876 13.6612C16.9282 13.1882 16.1259 12.9568 15.3158 13.006C14.5058 13.0552 13.7374 13.3821 13.1401 13.9315L6.8801 10.3515C6.95565 10.1051 6.99605 9.84926 7.0001 9.59155L13.1501 6.07155C13.7442 6.60839 14.5047 6.92463 15.3043 6.96725C16.1039 7.00986 16.8938 6.77625 17.5415 6.3056C18.1893 5.83494 18.6555 5.15587 18.862 4.38227C19.0685 3.60866 19.0027 2.78758 18.6757 2.05672C18.3486 1.32587 17.7802 0.729688 17.0658 0.368173C16.3514 0.00665843 15.5344 -0.0982048 14.7518 0.0711705C13.9692 0.240546 13.2687 0.673858 12.7677 1.29844C12.2667 1.92301 11.9957 2.70087 12.0001 3.50155C12.0035 3.78885 12.0438 4.07453 12.1201 4.35155L6.4301 7.60155C6.10041 7.0915 5.64367 6.67602 5.10479 6.39595C4.5659 6.11588 3.9634 5.98085 3.35653 6.00413C2.74965 6.02742 2.15928 6.20822 1.64343 6.52876C1.12759 6.8493 0.704035 7.29856 0.414395 7.83237C0.124755 8.36617 -0.0209992 8.96616 -0.00854068 9.57336C0.00391786 10.1806 0.17416 10.7741 0.485452 11.2955C0.796745 11.817 1.23837 12.2485 1.76693 12.5476C2.29549 12.8467 2.89278 13.0032 3.5001 13.0015ZM15.5001 15.0015C15.7968 15.0015 16.0868 15.0895 16.3335 15.2543C16.5801 15.4192 16.7724 15.6534 16.8859 15.9275C16.9995 16.2016 17.0292 16.5032 16.9713 16.7942C16.9134 17.0852 16.7705 17.3524 16.5608 17.5622C16.351 17.772 16.0837 17.9148 15.7927 17.9727C15.5018 18.0306 15.2002 18.0009 14.9261 17.8874C14.652 17.7738 14.4177 17.5816 14.2529 17.3349C14.0881 17.0882 14.0001 16.7982 14.0001 16.5015C14.0001 16.1037 14.1581 15.7222 14.4394 15.4409C14.7207 15.1596 15.1023 15.0015 15.5001 15.0015ZM15.5001 2.00155C15.7968 2.00155 16.0868 2.08952 16.3335 2.25434C16.5801 2.41916 16.7724 2.65343 16.8859 2.92752C16.9995 3.20161 17.0292 3.50321 16.9713 3.79418C16.9134 4.08515 16.7705 4.35243 16.5608 4.56221C16.351 4.77198 16.0837 4.91485 15.7927 4.97272C15.5018 5.0306 15.2002 5.0009 14.9261 4.88736C14.652 4.77383 14.4177 4.58157 14.2529 4.3349C14.0881 4.08823 14.0001 3.79822 14.0001 3.50155C14.0001 3.10372 14.1581 2.72219 14.4394 2.44089C14.7207 2.15958 15.1023 2.00155 15.5001 2.00155ZM3.5001 8.00154C3.79677 8.00154 4.08678 8.08952 4.33346 8.25434C4.58013 8.41916 4.77239 8.65343 4.88592 8.92752C4.99945 9.20161 5.02916 9.50321 4.97128 9.79418C4.9134 10.0852 4.77054 10.3524 4.56076 10.5622C4.35098 10.772 4.08371 10.9148 3.79274 10.9727C3.50177 11.0306 3.20017 11.0009 2.92608 10.8874C2.65199 10.7738 2.41772 10.5816 2.2529 10.3349C2.08808 10.0882 2.0001 9.79822 2.0001 9.50154C2.0001 9.10372 2.15814 8.72219 2.43944 8.44088C2.72075 8.15958 3.10228 8.00154 3.5001 8.00154Z" fill='var(--secondary)' />
                      </svg>
                      <span>Share</span>
                    </Button>
                  </div>

                  {
                    wishList && wishList[0]?.products?.length && <Button
                      onClick={handleRemoveAll}
                      disabled={wishList?.length == 0}
                      className='bg-white text-custom-black text-[0.875rem] h-[2.5rem] border border-black w-[10rem] md:rounded-[0.5rem]'
                    >
                      Clear All
                    </Button>
                  }
                </div>
              }
            </div>

            <div className='mt-[2rem]'>
              <p className='text-[0.875rem] md:text-[1.125rem]'>It's super simple to create a wishlist! When you're browsing and see something you love, click the heart icon to add that item to your list. You can even login and drop a little hint by sharing your wish list with your nearest and dearest!</p>

              {
                !wishList ? <div className='mt-[2rem] md:mt-[2.5rem] w-full flex items-center justify-center'>
                  <p className='text-[1.125rem]'>There are no items in your Wishlist</p>
                </div> : <WishLists pageType="wishlist" wishLists={wishList} />
              }

            </div>
          </div>

          {
            !wishList && <NowTrending title="Now Trending" />
          }
        </div>
      </DashboardLayout>

      {
        isShareWishlistModalOpen && <ShareWishlistModal
          isOpen={isShareWishlistModalOpen}
          onShare={handleShareWishlist}
        />
      }
    </Navigation>
  )
}
