import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parse from 'html-react-parser';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function customeParser(string: string) {
  if (string) {
    return parse(string)
  }
  return string
}