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
      <SelectTrigger className=" bg-white text-custom-black h-[2rem] min-w-[10rem] text-[0.875rem] ">
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
