'use client'

import { Avatar, Tooltip } from '@nextui-org/react'
import { formatPublishedAt } from '@utils/formatData.utils'
import { useState } from 'react'

export interface CommentProps {
  userAvatar: string
  firstName: string
  lastName: string
  comment: string
  publishedAt: Date
}

export const Comment = ({
  userAvatar,
  firstName,
  lastName,
  comment,
  publishedAt,
}: CommentProps) => {
  const [showFullComment, setShowFullComment] = useState(false)
  const userFullName = firstName + ' ' + lastName
  const isLongComment = comment.length > 500
  const displayComment =
    isLongComment && !showFullComment
      ? comment.substring(0, 500) + '...'
      : comment

  const toggleShowComment = () => {
    setShowFullComment(!showFullComment)
  }

  return (
    <div className="flex flex-row items-start gap-4">
      {/* User avatar */}
      <div>
        <Avatar showFallback src={userAvatar} />
      </div>

      {/* User name */}
      <div className="flex flex-col gap-1 items-start justify-center">
        <div className="flex flex-row gap-2">
          <Tooltip
            color="foreground"
            offset={20}
            delay={0}
            closeDelay={0}
            content={userFullName}
          >
            <h3 className="text-base font-extrabold leading-none">
              {userFullName}
            </h3>
          </Tooltip>

          <h5 className="text-small text-default-400">
            {formatPublishedAt(publishedAt)}
          </h5>
        </div>

        {/* User Comment */}
        <p className="text-small tracking-tight">{displayComment}</p>
        {isLongComment && (
          <button
            onClick={toggleShowComment}
            className="text-small cursor-pointer hover:underline text-default-500"
          >
            {showFullComment ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  )
}

Comment.displayName = 'Comment'
