import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FilterSortBy() {
  return (
    <Select>
      <SelectTrigger className="bg-white text-black h-[2rem] min-w-[10rem] text-[1rem] rounded-none border-black">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent className="rounded-none border border-none shadow-lg">
        <SelectGroup>
          {[
            { value: "low to high", label: "Price: low to high" },
            { value: "high to low", label: "Price: high to low" },
            { value: "old to new", label: "Date: old to new" },
            { value: "new to old", label: "Date: new to old" },
            { value: "featured", label: "Featured" },
            { value: "best sellers", label: "Best Sellers" },
            { value: "a to z", label: "Alphabetically: A-Z" },
            { value: "z to a", label: "Alphabetically: Z-A" },
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
