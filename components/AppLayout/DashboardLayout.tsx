"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Gift,
  Heart,
  House,
  ShieldQuestionMark,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, selectUserProfile, selectUserToken } from "@/lib/features/user/userSlice";
import { selectCart } from "@/lib/features/cart/cartSlice";
import { selectWishLists } from "@/lib/features/wishlist/wishlistSlice";

const dashboardTabs = [
  {
    name: "Orders", href: "/dashboard/orders", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path d="M20 6.49866C20.0097 6.429 20.0097 6.35832 20 6.28866V6.20866C19.9828 6.15285 19.9593 6.09917 19.93 6.04866C19.917 6.01986 19.9002 5.99295 19.88 5.96866L19.78 5.83866L19.58 5.68866L10.58 0.688662C10.428 0.600894 10.2555 0.554688 10.08 0.554688C9.90446 0.554688 9.73202 0.600894 9.58 0.688662L0.58 5.68866L0.49 5.75866L0.38 5.83866C0.350949 5.87136 0.327316 5.9085 0.31 5.94866C0.278005 5.97736 0.250974 6.01115 0.23 6.04866C0.204035 6.09254 0.183867 6.1396 0.17 6.18866C0.164405 6.22176 0.164405 6.25556 0.17 6.28866C0.101246 6.34795 0.0436692 6.41907 0 6.49866V14.4987C0.00129782 14.6769 0.050188 14.8515 0.141611 15.0044C0.233035 15.1574 0.36367 15.2831 0.52 15.3687L9.52 20.3687C9.56132 20.3928 9.60485 20.4129 9.65 20.4287H9.75C9.91428 20.4685 10.0857 20.4685 10.25 20.4287H10.35L10.49 20.3687L19.49 15.3687C19.6445 15.2818 19.7731 15.1555 19.8627 15.0027C19.9523 14.8498 19.9997 14.6759 20 14.4987V6.49866ZM10 10.3687L3.06 6.49866L5.82 4.97866L12.65 8.87866L10 10.3687ZM10 2.64866L16.94 6.49866L14.7 7.74866L7.87 3.83866L10 2.64866ZM2 8.19866L9 12.1187V17.7987L2 13.9087V8.19866ZM11 17.7987V12.1187L14 10.4387V13.4987L16 12.4987V9.31866L18 8.20866V13.9087L11 17.7987Z" fill="black" />
    </svg>
  },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: <Heart className="h-4 w-4" /> },
  // { name: "Gift cards & Vouchers", href: "/dashboard/giftcards", icon: <Gift className="h-4 w-4" /> },
  { name: "My details", href: "/dashboard/details", icon: <UserRound className="h-4 w-4" /> },
  { name: "My Address Book", href: "/dashboard/address", icon: <House className="h-4 w-4" /> },
  // {
  //   name: "Need Help ?", href: "/dashboard/help", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  //     <path d="M9.99998 4.5C8.95702 4.50132 7.95716 4.91622 7.21968 5.6537C6.4822 6.39118 6.0673 7.39104 6.06598 8.434H8.06598C8.06598 7.367 8.93398 6.5 9.99998 6.5C11.066 6.5 11.934 7.367 11.934 8.434C11.934 9.032 11.453 9.466 10.718 10.06C10.4779 10.2481 10.2472 10.448 10.027 10.659C9.02898 11.656 8.99998 12.715 8.99998 12.833V13.5H11L10.999 12.867C11 12.851 11.032 12.481 11.44 12.074C11.59 11.924 11.779 11.774 11.975 11.616C12.754 10.985 13.933 10.032 13.933 8.434C13.9322 7.39106 13.5176 6.39104 12.7802 5.65347C12.0428 4.9159 11.0429 4.50106 9.99998 4.5ZM8.99998 14.5H11V16.5H8.99998V14.5Z" fill="black" />
  //     <path d="M10 0.5C4.486 0.5 0 4.986 0 10.5C0 16.014 4.486 20.5 10 20.5C15.514 20.5 20 16.014 20 10.5C20 4.986 15.514 0.5 10 0.5ZM10 18.5C5.589 18.5 2 14.911 2 10.5C2 6.089 5.589 2.5 10 2.5C14.411 2.5 18 6.089 18 10.5C18 14.911 14.411 18.5 10 18.5Z" fill="black" />
  //   </svg>
  // },
  {
    name: "Logout", href: "/logout", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
      <path d="M14 10.5V8.5H5V5.5L0 9.5L5 13.5V10.5H14Z" fill="black" />
      <path d="M18 0.5H9C7.897 0.5 7 1.397 7 2.5V6.5H9V2.5H18V16.5H9V12.5H7V16.5C7 17.603 7.897 18.5 9 18.5H18C19.103 18.5 20 17.603 20 16.5V2.5C20 1.397 19.103 0.5 18 0.5Z" fill="black" />
    </svg>
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profile = useAppSelector(selectUserProfile)
  const token = useAppSelector(selectUserToken)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const wishlist = useAppSelector(selectWishLists)

  useEffect(() => {
    if (!token) {
      router.replace("/")
    }
  }, [token, router])

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center md:z-0">
      <div className="w-full px-4 py-3 border-b flex items-center justify-between">
        <div className="w-full max-w-[90rem] px-[1rem] lg:px-[3rem] mx-auto flex flex-row items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="capitalize">
                          {segment}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <div className="capitalize">
                            {segment}
                          </div>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>


          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="flex w-full h-full justify-center items-start relative">
        <div className="max-w-[90rem] w-full h-full flex flex-row">
          <aside className={`bg-white fixed top-0 left-0 h-full w-3/4 max-w-xs z-50 transform transition-transform duration-300 md:relative md:translate-x-0 md:w-1/4 md:block ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-4 flex flex-col gap-2 w-full">
              {profile && (
                <div className="flex flex-row items-start space-y-2 gap-x-[1rem]">
                  <div className="uppercase flex items-center justify-center rounded-full h-[5rem] w-[5rem] bg-[#C9A0FF] text-black text-[2rem] font-semibold">
                    {profile.first_name && profile.last_name
                      ? `${profile.first_name[0]}${profile.last_name[0]}`
                      : ""}
                  </div>
                  <div className="text-black self-center flex flex-col gap-x-[1rem] items-start justify-center">
                    <span className="text-[0.875rem]">Hi</span>
                    <span className="font-bold text-[1rem]">{profile?.first_name?.length ? profile?.first_name : ""}</span>
                  </div>
                </div>
              )}

              {dashboardTabs.map((tab, index) => {
                const isActive = pathname === tab.href;

                if (tab.name == 'Logout') {
                  return <Button key={index?.toString()}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start rounded-sm h-[2.5rem] gap-2 ${tab.name == 'Logout' ? 'underline' : ''} ${isActive ? "bg-[#804A9D29] text-custom-black hover:bg-[#804A9D12]" : "hover:bg-muted"}`}
                    onClick={() => dispatch(logout())}
                  >
                    {tab.icon && tab.icon}
                    {tab.name}
                  </Button>
                }

                if (tab.name == 'Wishlist') {
                  return (
                    <Link key={tab.name} href={tab.href}>
                      <Button key={index?.toString()}
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-between rounded-sm h-[2.5rem] gap-2 ${isActive ? "bg-[#804A9D29] text-custom-black hover:bg-[#804A9D12]" : "hover:bg-muted"}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {tab.icon && tab.icon}
                          {tab.name}
                        </div>
                        {
                          wishlist && wishlist[0]?.products && wishlist[0]?.products?.length > 0 ? <div className='border-black h-[1.3rem] border w-[2rem] flex justify-center items-center rounded-full'>
                            <span className='text-[0.875rem]'>{wishlist[0]?.products?.length}</span>
                          </div> : <span className='text-[0.875rem]'>{0}</span>
                        }
                      </Button>
                    </Link>
                  )
                }

                return (
                  <Link key={tab.name} href={tab.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start rounded-sm h-[2.5rem] gap-2 ${tab.name == 'Logout' ? 'underline' : ''} ${isActive ? "bg-[#804A9D29] text-custom-black hover:bg-[#804A9D12]" : "hover:bg-muted"}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {tab.icon && tab.icon}
                      {tab.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </aside>

          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-[black/40] z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <main className="flex-1 p-[1rem] h-full">
            <div className="md:p-6 h-full bg-white">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
