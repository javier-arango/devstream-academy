'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { AddCommentForm } from './AddCommentForm'
import { CommentList } from './CommentList'

const commentList = [
  {
    userAvatar: '',
    firstName: 'John',
    lastName: 'Doe',
    comment:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
    publishedAt: new Date(),
  },
  {
    userAvatar: '',
    firstName: 'John',
    lastName: 'Doe',
    comment:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.',
    publishedAt: new Date(),
  },
]

export const CommentSection = () => {
  return (
    <section>
      <Card
        fullWidth
        radius="none"
        shadow="none"
        classNames={{
          base: 'bg-transparent p-0 md:p-4',
        }}
      >
        <CardHeader className="flex flex-col gap-5 items-start mb-3">
          <h1 className="text-default-900 text-lg md:text-xl font-extrabold capitalize-first">
            {commentList.length} Comments
          </h1>

          <AddCommentForm />
        </CardHeader>
        <CardBody>
          <CommentList comments={commentList} />
        </CardBody>
      </Card>
    </section>
  )
}

// Display name
CommentSection.displayName = 'CommentSection'
