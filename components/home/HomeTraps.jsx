'use client'

import { popular, trapsOutlined } from '../../data/icons'
import { useData } from '../../context/data-context'
import { ErrorMessage } from '../utils/ErrorMessage'
import { HomeCard } from './HomeCard'
import { OpeningGroup } from '../learn/OpeningGroup'

export function HomeTraps() {
  const { traps, loadingError } = useData()

  const filteredTraps = traps
    ? [...traps].sort((a, b) => b.options.length - a.options.length).slice(0, 4)
    : null

  return (
    <HomeCard
      iconPrimary={trapsOutlined}
      iconSecondary={popular}
      link="/traps"
      linkText="Show All Traps"
      text="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly respond."
      titlePrimary="Learn Chess Opening Traps"
      titleSecondary="Most Popular"
    >
      {loadingError && (
        <ErrorMessage>
          There was an error when loading website data. Please try again later.
        </ErrorMessage>
      )}
      <div className="flex flex-wrap">
        {filteredTraps?.map((group) => (
          <OpeningGroup key={group.label} group={group} type="traps" />
        ))}
      </div>
    </HomeCard>
  )
}
