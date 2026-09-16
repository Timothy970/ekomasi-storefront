"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Crumb } from "@/lib/features/types"
import React from "react"

export default function CustomBreadcrumb({ crumbs }: Readonly<{ crumbs: Crumb[] }>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-custom-black font-roboto text-[1rem] font-semibold"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs?.map((crumb, idx) => (
          <React.Fragment key={`${crumb.name}-${crumb.link}`}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {idx === crumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize text-custom-black font-roboto text-[1rem] font-semibold">
                  {crumb.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    href={crumb.link}
                    className="capitalize text-custom-black font-roboto text-[1rem] font-semibold"
                  >
                    {crumb.name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
