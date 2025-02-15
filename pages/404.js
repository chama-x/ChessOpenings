import { LinkButton } from '../components/utils/Button'
import { Logo } from '../components/utils/Logo'
import { SEO } from '../components/utils/SEO'

export default function NotFound() {
  return (
    <div className="mb-10 flex w-full max-w-[512px] flex-col">
      <SEO description="Page Not Found" title="404" path="/" />

      <div className="my-8 flex flex-col items-center">
        <div className="w-20">
          <Logo />
        </div>
        <h1 className="mt-4 text-xl xs:text-2xl sm:text-3xl">404</h1>
      </div>

      <p className="mb-4 text-lg">
        Looks like the page you tried to access doesn&apos;t exist. Try your luck with the Home
        page.
      </p>

      <LinkButton fill link="/">
        Home Page
      </LinkButton>
    </div>
  )
}
