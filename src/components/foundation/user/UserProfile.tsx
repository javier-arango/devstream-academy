'use client'

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Spacer,
} from '@nextui-org/react'
// import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPen } from 'react-icons/fa6'
import type { UserDetails } from 'types'

interface UserProfileProps {
  user: UserDetails
  children?: React.ReactNode
}

export const UserProfile = ({ user, children }: UserProfileProps) => {
  // const router = useRouter()
  return (
    <Card
      shadow="none"
      fullWidth
      radius="none"
      classNames={{
        base: 'bg-transparent',
      }}
    >
      <CardHeader className="flex flex-row justify-between flex-wrap gap-8">
        <div className="flex gap-4">
          {/* User avatar */}
          <Avatar
            isBordered
            showFallback
            className="lg:w-32 lg:h-32"
            radius="full"
            size="lg"
            src={user.avatar || ''}
          />

          {/* User info */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="text-xl lg:text-3xl font-bold leading-none text-default-600">
              {user.firstName + ' ' + user.lastName}
            </h1>

            {/* User join date */}
            <h5 className="text-small lg:text-base tracking-tight text-default-400">
              {`Joined on ${new Date(user.createdAt).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}`}
            </h5>
          </div>
        </div>

        {/* Edit profile */}
        <div className="flex flex-col gap-1 items-start justify-center w-full md:w-auto">
          <Button
            fullWidth
            variant="flat"
            color="primary"
            startContent={<FaPen />}
            as={Link}
            href="/user/profile/edit"
          >
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {/* User bio */}
        <Accordion fullWidth variant="shadow" defaultExpandedKeys={['bio']}>
          <AccordionItem
            key="bio"
            aria-label="User bio"
            subtitle="Collapse to hide bio"
            title="Bio"
          >
            <p>{user.bio || 'No bio'}</p>
          </AccordionItem>
        </Accordion>

        <Spacer y={4} />

        {/* User profile content (playlist) */}
        {children}
      </CardBody>
    </Card>
  )
}

// Display name
UserProfile.displayName = 'UserProfile'
