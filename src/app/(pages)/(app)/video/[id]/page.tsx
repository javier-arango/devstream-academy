import {
  SaveVideoToPlaylist,
  SaveVideoToPlaylistNotUser,
  VideoDetailsSkeleton,
  VideoMetadata,
  VideoPlayer,
  WarningMessage,
} from '@components/foundation'

import { Skeleton } from '@nextui-org/react'
import type { Channel, Video } from '@prisma/client'
import {
  getChannelDetails,
  getUserPlaylists,
  getVideoDetails,
} from '@services/API'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import type { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import type { PlaylistListResponse } from 'types'

interface VideoDetailsProps {
  userEmail: string | null
  channelId: string
  videoDetails: Video
}

async function SaveVideoToPlaylistButton({
  userEmail,
  videoId,
}: {
  userEmail: string
  videoId: string
}) {
  const userPlaylist: PlaylistListResponse | null =
    await getUserPlaylists(userEmail)

  if (!userPlaylist) return null

  return (
    <SaveVideoToPlaylist
      userEmail={userEmail}
      videoId={videoId}
      userPlaylists={userPlaylist.playlists}
    />
  )
}

async function VideoDetails({
  userEmail,
  channelId,
  videoDetails,
}: VideoDetailsProps) {
  const channelDetails: Channel | null = await getChannelDetails(channelId)

  if (!channelDetails) {
    return (
      <WarningMessage
        title="Channel not found"
        subtitle="An error occurred while trying to fetch the channel"
      />
    )
  }

  return (
    <VideoMetadata
      channelId={channelId}
      channelAvatar={channelDetails.thumbnailUrl}
      commentCount={videoDetails.commentsCount}
      channelName={channelDetails.title}
      subscribersCount={channelDetails.subscribersCount}
      videoTitle={videoDetails.title}
      videoDescription={videoDetails.description}
      viewsCount={videoDetails.viewsCount}
      likesCount={videoDetails.likesCount}
      publishedAt={videoDetails.publishedAt}
    >
      {userEmail ? (
        <Suspense
          fallback={
            <div className="h-screen">
              <Skeleton className="w-10 h-20" />
            </div>
          }
        >
          <SaveVideoToPlaylistButton
            userEmail={userEmail}
            videoId={videoDetails.videoId}
          />
        </Suspense>
      ) : (
        <SaveVideoToPlaylistNotUser videoId={videoDetails.videoId} />
      )}
    </VideoMetadata>
  )
}

export default async function VideoPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Get user session
  const session: Session | null = await getServerSession(authOptions)

  // Fetch data from API
  const videoDetails: Video | null = await getVideoDetails(id)

  if (!videoDetails) {
    return (
      <WarningMessage
        title="Video not found"
        subtitle="An error occurred while trying to fetch the video"
      />
    )
  }

  return (
    <div className="flex flex-col">
      <VideoPlayer
        id="video-details-player"
        title={videoDetails.title}
        videoId={videoDetails.videoId}
      />

      <Suspense
        fallback={
          <div className="h-screen">
            <VideoDetailsSkeleton />
          </div>
        }
      >
        <VideoDetails
          userEmail={session?.user?.email || null}
          channelId={videoDetails.channelId}
          videoDetails={videoDetails}
        />
      </Suspense>
    </div>
  )
}

// Display name
VideoPage.displayName = 'VideoPage'
