import {
  ChannelMetadata,
  VideoList,
  WarningMessage,
} from '@components/foundation'
import { Divider, Spinner } from '@nextui-org/react'
import type { Channel } from '@prisma/client'
import { getChannelDetails, getChannelVideos } from '@services/API'
import { formatToCompactNumber } from '@utils/formatData.utils'
import { Suspense } from 'react'
import type { VideoListResponse } from 'types'

interface VideoListGridProps {
  channelId: string
}

async function VideoListGrid({ channelId }: VideoListGridProps) {
  // Get videos from search query
  const channelVideoList: VideoListResponse | null =
    await getChannelVideos(channelId)

  // If no videos, return no videos message
  if (!channelVideoList.videos) {
    return (
      <WarningMessage
        title="No videos found"
        subtitle="An error might have ocurred"
      />
    )
  }

  return (
    <div>
      <h1 className="text-lg font-bold pb-4 text-center md:text-left">
        {`Total videos: ${formatToCompactNumber(channelVideoList.count)}`}
      </h1>
      <VideoList videos={channelVideoList.videos} />
    </div>
  )
}

export default async function ChannelPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch data from API
  const channelDetails: Channel | null = await getChannelDetails(id)

  if (!channelDetails) {
    return (
      <WarningMessage
        type="error"
        title="Channel not found"
        subtitle="An error occurred while trying to fetch the channel"
      />
    )
  }

  return (
    <div className="px-2 py-4 lg:p-8 md:p-4">
      <ChannelMetadata {...channelDetails} />

      <Divider />

      <Suspense
        fallback={
          <div className="flex justify-center align-center w-screen h-80">
            <Spinner size="lg" />
          </div>
        }
      >
        <div className="pt-5 pb-10">
          <VideoListGrid channelId={channelDetails.channelId} />
        </div>
      </Suspense>
    </div>
  )
}

// Display name
ChannelPage.displayName = 'ChannelPage'
