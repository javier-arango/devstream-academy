import { AiFillWarning } from 'react-icons/ai'

interface WarningMessageProps {
  title: string
  subtitle: string
  type?: 'error' | 'warning'
}

export const WarningMessage = ({
  title,
  subtitle,
  type = 'warning',
}: WarningMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <AiFillWarning
        className={`text-6xl text-default-500 ${
          type === 'error' ? 'text-red-600' : 'text-yellow-600'
        }
      `}
      />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-default-500 text-sm">{subtitle}</p>
    </div>
  )
}

// Display name
WarningMessage.displayName = 'WarningMessage'
