'use client'

import { baseURL } from '@lib/baseUrl'
import { useState } from 'react'
import type { YouTubeProps } from 'react-youtube'
import YouTube from 'react-youtube'
import { Thumbnail } from '../Thumbnail'
import { WarningMessage } from '../WarningMessage'

export const VideoPlayer = ({
  id,
  videoId,
  className,
  style,
  title,
  opts,
}: YouTubeProps) => {
  const defaultOpts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      rel: 0,
      autoplay: 1,
      frameborder: 0,
      cc_lang_pref: 'en',
      cc_load_policy: 1,
      iv_load_policy: 3,
      origin: baseURL,
    },
  }

  // Loading state for the player
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const [isPlayerReady, setPlayerReady] = useState(false)
  const onPlayerReady = () => {
    setPlayerReady(true)
  }

  // Error state for the player
  const [hasError, setError] = useState(false)
  const onError = () => {
    setError(true)
  }

  if (hasError) {
    return (
      <WarningMessage
        type="error"
        title="An error has occurred"
        subtitle="Video cannot be played at the moment."
      />
    )
  }

  return (
    <>
      <div
        className={`relative w-full aspect-video dark:bg-white light:bg-black ${
          className || ''
        }`}
        style={{
          height: '56.25vw',
          maxHeight: 'calc(100vh - 169px)',
          ...style,
        }}
      >
        {!isPlayerReady && (
          <Thumbnail
            src={thumbnailUrl}
            alt="Video Thumbnail Image"
            style={{ opacity: isPlayerReady ? 0 : 1 }}
            priority
          />
        )}

        <YouTube
          id={id}
          videoId={videoId}
          className="absolute inset-0 w-full h-full"
          title={title}
          opts={defaultOpts || opts}
          loading="lazy"
          onReady={onPlayerReady}
          onError={onError}
        />
      </div>
    </>
  )
}

// Display name
VideoPlayer.displayName = 'VideoPlayer'
