"use client";

import { selectCategory } from "@/lib/features/navigation/navigationSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CustomBreadcrumb() {
  const category = useAppSelector(selectCategory);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-custom-black font-roboto text-[0.875rem] font-semibold"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-custom-black font-roboto text-[0.875rem] font-semibold">
            {category?.name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
