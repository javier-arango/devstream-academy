'use client'

import { Avatar, Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AddCommentFormProps {
  comment: string
}

export const AddCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = useForm<AddCommentFormProps>({ mode: 'onChange' })
  const [isTextareaClicked, setIsTextareaClicked] = useState(false)

  const comment = watch('comment')

  const onSubmit: SubmitHandler<AddCommentFormProps> = async (
    formData: AddCommentFormProps
  ) => {
    console.log(formData.comment)
    setIsTextareaClicked(false)
    reset()

    // You can replace this with your actual API call
    const res = await new Promise((resolve) =>
      setTimeout(() => resolve({ error: false }), 1000)
    )

    if (res && res.error) {
      toast.error('An error occurred while adding the comment.')
    } else {
      toast.success('Comment was added successfully.')
    }
  }

  const handleTextareaClick = () => {
    setIsTextareaClicked(true)
  }

  const handleCancelClick = () => {
    reset()
    setIsTextareaClicked(false)
  }

  return (
    <div className="flex flex-row break-all gap-4 w-full items-start">
      <Avatar size="md" showFallback src="" />
      <form
        className="flex flex-col items-end gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textarea
          {...register('comment')}
          minRows={1}
          maxRows={20}
          variant="underlined"
          placeholder="Add a comment..."
          onFocus={handleTextareaClick}
        />
        {isTextareaClicked && (
          <div className="flex flex-row justify-end gap-2">
            <Button
              type="button"
              variant="light"
              radius="full"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={!comment || isSubmitting}
              isLoading={isSubmitting}
              color={comment ? 'secondary' : 'default'}
              radius="full"
            >
              Comment
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

AddCommentForm.displayName = 'AddCommentForm'
