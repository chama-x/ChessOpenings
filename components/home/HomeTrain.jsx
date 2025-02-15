'use client'

import VisibilitySensor from 'react-visibility-sensor'

import { medal, trainOutlined } from '../../data/icons'
import { useData } from '../../context/data-context'
import { useStats, useWindowSize } from '../../functions/hooks'
import { CountUp } from '../utils/CountUp'
import { HomeCard } from './HomeCard'
import { LinkButton } from '../utils/Button'
import { ProgressBar } from '../utils/ProgressBar'
import { ProgressCircle } from '../utils/ProgressCircle'

export function HomeTrain() {
  const { userData } = useData()

  // maybe just add number of openings with a success too?

  // Don't need to show these on train section, these can be left for stats page/section
  // openings trained
  // opening variations trained

  // display specific display stats on peoples profiles (e.g. total learns, total passes, favorite opening --> most passes), with button to view more in detail, show pass rate, show somewhere the global average pass rate

  return (
    <HomeCard
      alignRight
      iconPrimary={trainOutlined}
      iconSecondary={medal}
      link="/train"
      linkText="Start Training"
      text="Test your Chess openings knowledge and see if you can remember the moves without hints. Become an openings
        master."
      titlePrimary="Train Chess Openings"
      titleSecondary="Opening Mastery"
    >
      <VisibilitySensor partialVisibility>
        {({ isVisible }) =>
          userData ? (
            <div key="visible" className="mx-2 flex flex-wrap lg:mx-4">
              <HomeTrainMastery isVisible={isVisible} userData={userData} />
              <div className="flex w-full flex-col 2xl:w-3/5">
                <HomeTrainNumbers isVisible={isVisible} userData={userData} />
                <HomeTrainMilestones isVisible={isVisible} userData={userData} />
              </div>
            </div>
          ) : (
            <HomeTrainBlurred />
          )
        }
      </VisibilitySensor>
      {userData && (
        <div className="m-2 flex lg:hidden">
          <LinkButton link={`/user/${userData.uid}`} fill>
            View All Stats
          </LinkButton>
        </div>
      )}
    </HomeCard>
  )
}

function HomeTrainMastery({ isVisible, userData }) {
  const { noOfOpenings, noOfOpeningsMastered, noOfOpeningVariationsMastered, noOfVariations } =
    useStats({
      stats: userData.stats,
    })
  const { windowSize } = useWindowSize()
  const progressSize = windowSize >= 768 ? 250 : 200

  return (
    <div className="mb-8 flex w-full flex-wrap items-center 2xl:w-2/5">
      <div className="flex w-full flex-col items-center xs:w-1/2">
        <h4 className="text-md my-4 md:text-xl">Openings Mastered</h4>
        <ProgressCircle
          progress={isVisible ? (noOfOpeningsMastered / noOfOpenings) * 100 : 0}
          showMastery
          strokeWidth={8}
          text={`${noOfOpeningsMastered} / ${noOfOpenings}`}
          width={progressSize}
        />
      </div>

      <div className="flex w-full flex-col items-center xs:w-1/2">
        <h4 className="text-md my-4 md:text-xl">Variations Mastered</h4>
        <ProgressCircle
          progress={isVisible ? (noOfOpeningVariationsMastered / noOfVariations) * 100 : 0}
          showMastery
          strokeWidth={8}
          text={`${noOfOpeningVariationsMastered} / ${noOfVariations}`}
          width={progressSize}
        />
      </div>
    </div>
  )
}

function HomeTrainNumbers({ isVisible, userData }) {
  const { noOfVariationsAttempted, noOfVariationsPassed } = useStats({
    stats: userData.stats,
  })

  return (
    <div className="mb-8 flex w-full">
      <CountUp
        duration={0.5}
        label="Variations Attempted"
        value={isVisible ? noOfVariationsAttempted : 0}
      />
      <CountUp
        duration={0.5}
        label="Variations Passed"
        value={isVisible ? noOfVariationsPassed : 0}
      />
    </div>
  )
}

function HomeTrainMilestones({ isVisible, userData }) {
  const { trainStats } = useStats({
    stats: userData.stats,
  })

  return (
    <div>
      <h4 className="text-md mb-4 text-center md:text-xl">Closest Milestones</h4>
      {trainStats.length === 0 ? (
        <p className="text-center">
          Train some opening variations for your milestones to show here.
        </p>
      ) : (
        trainStats
          .slice(0, 3)
          .map((stats, index) => <ProgressBar key={index} isVisible={isVisible} stats={stats} />)
      )}
    </div>
  )
}

function HomeTrainBlurred() {
  return (
    <div className="relative">
      <img
        className="blur-md"
        src="/media/images/stats.png"
        alt="Chess statistics preview"
        width={800}
        height={400}
      />
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-white">
        <div className="hidden items-center xs:flex">
          <h1 className="text-xl sm:text-4xl md:text-5xl">Want to track your stats?</h1>
        </div>
        <h2 className="sm:text-md text-center text-sm xs:mt-2 md:text-lg">
          Register or Sign In to gain access to stats, achievements and more
        </h2>
        <div className="mt-2 flex w-full justify-center xs:mt-4">
          <div className="mr-4 flex w-full justify-end">
            <LinkButton link="/register">Register</LinkButton>
          </div>
          <div className="ml-4 flex w-full justify-start">
            <LinkButton link="/sign-in">Sign In</LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
