"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFilterQuery } from "@/app/ClientLayout"
import { usePathname, useRouter } from "next/navigation"

export function FilterSortBy() {
  const { query, setQuery } = useFilterQuery()
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)
  const currentValue = searchParams.get("sort_by") ?? ""

  const handleChange = (value: string) => {
    const params = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query)

    if (value) {
      params.set("sort_by", value)
    } else {
      params.delete("sort_by")
    }

    const newQuery = "?" + params.toString()
    setQuery(newQuery)

    const newUrl = `${pathname}${newQuery}`
    router.replace(newUrl, { scroll: false })
  }

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className="bg-white text-black h-[2rem] min-w-[10rem] text-[1rem] rounded-none border-black">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent className="rounded-none border border-none shadow-lg">
        <SelectGroup>
          {[
            { value: "price:low-to-high", label: "Price: low to high" },
            { value: "price:high-to-low", label: "Price: high to low" },
            { value: "date:old-to-new", label: "Date: old to new" },
            { value: "date:new-to-old", label: "Date: new to old" },
            { value: "alphabetically:a-z", label: "Alphabetically: A-Z" },
            { value: "alphabetically:z-a", label: "Alphabetically: Z-A" },
          ].map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="
                h-[2rem] px-3 text-[0.875rem] cursor-pointer
                hover:text-purple-500
                data-[highlighted]:bg-transparent
                focus:bg-transparent
              "
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
