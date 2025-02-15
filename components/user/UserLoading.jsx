import { LoadingSpinner } from '../../components/utils/LoadingSpinner'
import { SEO } from '../../components/utils/SEO'
import { Logo } from '../utils/Logo'

export function UserLoading({ text }) {
  return (
    <div className="container flex flex-col">
      <SEO
        description="View user profile information, achievements and statistics."
        title="user profile"
        path="/profile"
      />
      <LoadingSpinner
        img={
          <div className="w-24">
            <Logo />
          </div>
        }
        text={text || 'Loading User Data...'}
      />
    </div>
  )
}
