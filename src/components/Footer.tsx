import { Logo, ThemeSwitcher } from '@components/foundation'
import { Link } from '@nextui-org/react'

export const Footer = () => {
  return (
    <footer className="border-t-1 border-gray-400 py-8 mt-8">
      <div className="flex flex-wrap flex-col items-center gap-12 w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-between">
          <Logo />

          <ThemeSwitcher />
        </div>

        <span className="block text-default-400 text-center">
          Created with ♥ by{' '}
          <Link
            isExternal
            color="foreground"
            underline="hover"
            href="https://github.com/javier-arango"
          >
            Javier Arango
          </Link>
        </span>
      </div>
    </footer>
  )
}

// Display name
Footer.displayName = 'Footer'
