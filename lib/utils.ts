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

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}