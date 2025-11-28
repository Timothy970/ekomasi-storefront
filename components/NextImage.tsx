"use client"
import Image, { ImageProps } from "next/image"
import React from "react"

export interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string
  alt?: string
  className?: string
}

const NextImage: React.FC<ProductImageProps> = ({
  src,
  alt = "",
  width = 40,
  height = 40,
  className = "",
  unoptimized = true,
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={unoptimized}
      {...props}
    />
  )
}

export default NextImage
