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
      <SelectTrigger className="border bg-white text-black h-[2.5rem] lg:h-[3rem] min-w-[10rem] rounded-none lg:rounded-md flex gap-x-[1rem] lg:border lg:border-black">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value="low to high">Price: low to high</SelectItem>
          <SelectItem value="high to low">Price: high to low</SelectItem>
          <SelectItem value="old to new">Date: old to new</SelectItem>
          <SelectItem value="new to old">Date: new to old</SelectItem>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="best sellers">Best Sellers</SelectItem>
          <SelectItem value="a to z">Alphabetically: A-Z</SelectItem>
          <SelectItem value="z to a">Alphabetically: Z-A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
