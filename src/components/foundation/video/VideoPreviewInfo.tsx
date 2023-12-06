import { Avatar, Link, Tooltip } from '@nextui-org/react'
import type { Channel } from '@prisma/client'

interface VideoPreviewInfoProps {
  channelData?: Channel
  videoTitle: string
  videoViewsCount: string
  videoPublishedAt: string
  alignment?: 'horizontal' | 'vertical'
  hideAvatar?: boolean
  isLoading?: boolean
}

export const VideoPreviewInfo = ({
  channelData,
  videoTitle,
  videoViewsCount,
  videoPublishedAt,
  alignment,
  hideAvatar,
  isLoading,
}: VideoPreviewInfoProps) => {
  return (
    <>
      <div
        className={`flex gap-4 ${
          alignment === 'vertical' && 'items-start pt-2'
        }`}
      >
        {/* Channel Avatar */}
        {!hideAvatar && !isLoading && channelData && (
          <Link href={`/channel/${channelData.channelId}`}>
            <Avatar showFallback size="md" src={channelData.thumbnailUrl} />
          </Link>
        )}

        {/* Channel Info */}
        <div className="flex flex-col gap-1 items-start justify-center">
          {/* Video title (only vertical) */}
          {alignment === 'vertical' && (
            <h1 className="font-bold text-base">{videoTitle}</h1>
          )}

          {/* Channel title */}
          {!isLoading && channelData && (
            <Tooltip
              size="lg"
              color="foreground"
              offset={20}
              delay={0}
              closeDelay={0}
              content={channelData.title}
            >
              <Link href={`/channel/${channelData.channelId}`}>
                <h4 className="text-sm font-semibold leading-none text-default-500">
                  {channelData.title}
                </h4>
              </Link>
            </Tooltip>
          )}

          {/* Video stats (only vertical) */}
          {alignment === 'vertical' && (
            <p className="text-default-500 text-sm">
              {videoViewsCount} views • {videoPublishedAt}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

// Display name
VideoPreviewInfo.displayName = 'VideoPreviewInfo'
