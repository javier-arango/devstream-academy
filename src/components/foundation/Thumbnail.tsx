import { Image } from '@nextui-org/react'
import { generateImageBluerURL } from '@utils/generateImageBluerUrl.utils'
import NextImage from 'next/image'

export interface ThumbnailProps {
  src: string
  alt: string
  priority?: boolean
  isBlurred?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
  fallbackSrc?: string
  className?: string
}

export const Thumbnail = ({
  src,
  alt,
  priority = false,
  isBlurred = false,
  shadow = 'none',
  radius = 'none',
  fallbackSrc = generateImageBluerURL(105, 105, 105),
  style,
  className,
}: ThumbnailProps) => {
  return (
    <Image
      as={NextImage}
      src={src}
      alt={alt}
      style={style}
      shadow={shadow}
      isBlurred={isBlurred}
      radius={radius}
      fallbackSrc={fallbackSrc}
      className={className}
      classNames={{
        wrapper: 'relative w-full aspect-video padding-top-16x9',
        img: 'absolute inset-0 opacity-100 transition-opacity duration-500 ease-in-out',
      }}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 33vw"
      fill
    />
  )
}

// Display name
Thumbnail.displayName = 'Thumbnail'
