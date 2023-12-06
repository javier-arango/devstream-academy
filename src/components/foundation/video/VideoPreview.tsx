'use client'

import { Card, CardBody } from '@nextui-org/react'
import type { Channel } from '@prisma/client'
import { fetcher } from '@utils/fetcher.utils'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import type { VideoPreviewDetails } from 'types'
import { Thumbnail } from '../Thumbnail'
import { VideoPreviewInfo } from './VideoPreviewInfo'

interface VideoPreviewProps {
  video: VideoPreviewDetails
  alignment?: 'horizontal' | 'vertical'
  hideAvatar?: boolean
  hideDescription?: boolean
  fullWidth?: boolean
}

export const VideoPreview = ({
  video,
  hideAvatar = false,
  fullWidth = true,
  hideDescription = false,
  alignment = 'horizontal',
}: VideoPreviewProps) => {
  const {
    videoId,
    channelId,
    videoTitle,
    videoDescription,
    videoThumbnail,
    videoViewsCount,
    videoPublishedAt,
  } = video

  const router = useRouter()

  // Fetch channel details
  const { data, isLoading } = useSWR<Channel>(
    `/api/channel/${channelId}`,
    fetcher
  )

  const alignmentClasses =
    alignment === 'horizontal'
      ? 'grid grid-cols-6 md:grid-cols-12 lg:gap-5 md:gap-4 gap-3 items-center justify-center'
      : 'flex flex-col'

  return (
    <>
      <Card
        shadow="none"
        fullWidth={fullWidth}
        isPressable
        radius="none"
        allowTextSelectionOnPress
        classNames={{
          base: 'bg-transparent',
        }}
        onPress={() => {
          router.push(`/video/${videoId}`)
        }}
      >
        <CardBody className="p-0">
          <div className={alignmentClasses}>
            {/* Left Size */}
            <div className="relative col-span-6 md:col-span-4">
              <Thumbnail
                shadow="sm"
                radius="lg"
                alt={videoTitle}
                src={videoThumbnail}
              />
            </div>

            {/* Right Size */}
            <div className="flex flex-col col-span-6 md:col-span-8 lg:gap-3 md:gap-2 gap-1 h-full px-4 md:pl-0 lg:pl-0 md:pr-5 lg:pr-3">
              {/* Video Info (only horizontal) */}
              {alignment === 'horizontal' && (
                <div className="flex flex-col gap-1 md:gap-0">
                  {/* Video title */}
                  <h1 className="font-bold lg:text-xl md:text-lg text-base">
                    {videoTitle}
                  </h1>

                  {/* Video stats */}
                  <p className="text-default-500 text-sm">
                    {videoViewsCount} • {videoPublishedAt}
                  </p>
                </div>
              )}

              {/* Video & Channel Info */}
              <VideoPreviewInfo
                channelData={data}
                videoTitle={videoTitle}
                videoViewsCount={videoViewsCount}
                videoPublishedAt={videoPublishedAt}
                alignment={alignment}
                hideAvatar={hideAvatar}
                isLoading={isLoading}
              />

              {/* Video Description */}
              {!hideDescription && (
                <p className="text-default-500 text-sm">{videoDescription}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

// Display name
VideoPreview.displayName = 'VideoPreview'
