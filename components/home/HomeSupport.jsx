import { LinkButton } from '../utils/Button'
import { HomeCardSmall } from './HomeCard'

export function HomeSupport() {
  return (
    <HomeCardSmall>
      <div className="flex h-full flex-col items-center text-center">
        <h2 className="mb-4 text-lg sm:text-xl md:text-3xl">Want to support the site?</h2>
        <p className="mb-4">
          This site and its contents are provided to you completely for free and with no annoying
          advertisements. If you enjoy and learn from it, please consider donating to support the
          site and keep it running. Even if its just a coffee to keep the admin running.
        </p>
        <div className="my-8">
          <LinkButton link="/support">Support The Site</LinkButton>
        </div>
      </div>
    </HomeCardSmall>
  )
}
