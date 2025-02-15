'use client'

import { learnOutlined, popular } from '../../data/icons'
import { useData } from '../../context/data-context'
import { ErrorMessage } from '../utils/ErrorMessage'
import { HomeCard } from './HomeCard'
import { OpeningGroup } from '../learn/OpeningGroup'

export function HomeLearn() {
  const { openingGroups, loadingError } = useData()

  const filteredOpeningGroups = openingGroups
    ? [...openingGroups].sort((a, b) => b.options.length - a.options.length).slice(0, 4)
    : null

  return (
    <HomeCard
      iconPrimary={learnOutlined}
      iconSecondary={popular}
      link="/learn"
      linkText="Show All Openings"
      text="Learn new Chess openings and their variations to prepare yourself for whatever your opponent may throw at you."
      titlePrimary="Learn Chess Openings"
      titleSecondary="Most Popular"
    >
      {loadingError && (
        <ErrorMessage>
          There was an error when loading website data. Please try again later.
        </ErrorMessage>
      )}
      <div className="flex flex-wrap">
        {filteredOpeningGroups?.map((group) => (
          <OpeningGroup key={group.label} group={group} type="learn" />
        ))}
      </div>
    </HomeCard>
  )
}
