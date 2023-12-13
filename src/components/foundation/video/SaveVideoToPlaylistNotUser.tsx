'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { AiOutlinePlusSquare } from 'react-icons/ai'

export const SaveVideoToPlaylistNotUser = ({
  videoId,
}: {
  videoId: string
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()

  const handleSignIn = () => {
    // Construct the callback URL to redirect the user after login
    const callbackUrl = `/video/${videoId}`
    router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }

  return (
    <>
      {/* Modal action button */}
      <Tooltip
        color="foreground"
        delay={0}
        closeDelay={0}
        content="Save video to playlist"
      >
        <Button
          color="primary"
          radius="full"
          startContent={<AiOutlinePlusSquare />}
          variant="solid"
          onPress={onOpen}
        >
          Save
        </Button>
      </Tooltip>

      {/* Modal */}
      <Modal
        hideCloseButton
        size="sm"
        isOpen={isOpen}
        backdrop="opaque"
        placement='center'
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Want to watch this video again later ?
              </ModalHeader>
              <ModalBody>
                <p className="text-default-500">
                  Sign in to add this video to a playlist.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
                </Button>

                <Button color="primary" variant="light" onClick={handleSignIn}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

// Display name
SaveVideoToPlaylistNotUser.displayName = 'SaveVideoToPlaylistNotUser'
