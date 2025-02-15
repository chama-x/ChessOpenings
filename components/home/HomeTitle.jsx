import { useData } from '../../context/data-context'
import { LinkButton } from '../utils/Button'
import { Logo } from '../utils/Logo'

export function HomeTitle() {
  const { user } = useData()

  return (
    <div className="relative">
      <div className="bg-hero bg-cover bg-center py-32 blur-sm md:py-60" />
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <div className="flex items-center">
          <div className="w-10 sm:w-20">
            <Logo />
          </div>
          <h1 className="ml-4 text-2xl sm:text-4xl md:text-6xl">ChessOpenings.co.uk</h1>
        </div>
        <h2 className="sm:text-md mt-2 text-center text-sm md:text-lg">
          Learn and Train Chess Openings, completely for FREE
        </h2>
        <div className="mt-4 flex w-full justify-center">
          <div className="mr-4 flex w-full justify-end">
            <LinkButton link={user ? '/learn' : '/register'}>
              {user ? 'Learn' : 'Register'}
            </LinkButton>
          </div>
          <div className="ml-4 flex w-full justify-start">
            <LinkButton link={user ? '/train' : '/sign-in'}>
              {user ? 'Train' : 'Sign In'}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
