import { Comment, type CommentProps } from './Comment'

interface CommentListProps {
  comments: CommentProps[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className='flex flex-col gap-8'>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          userAvatar={comment.userAvatar}
          firstName={comment.firstName}
          lastName={comment.lastName}
          comment={comment.comment}
          publishedAt={comment.publishedAt}
        />
      ))}
    </div>
  )
}

// Display name
CommentList.displayName = 'CommentList'
