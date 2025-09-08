import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
