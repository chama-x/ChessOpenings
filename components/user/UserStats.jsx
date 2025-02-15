import { useState } from 'react'

import VisibilitySensor from 'react-visibility-sensor'

import { useData } from '../../context/data-context'
import { useStats, useWindowSize } from '../../functions/hooks'
import { Button } from '../utils/Button'
import { CountUp } from '../utils/CountUp'
import { ProgressBar } from '../utils/ProgressBar'
import { ProgressCircle } from '../utils/ProgressCircle'

export function UserStats({ stats }) {
  const [showLimit, setShowLimit] = useState(3)
  const { openingGroups } = useData()
  const {
    noOfOpenings,
    noOfOpeningsMastered,
    noOfOpeningVariationsMastered,
    noOfVariations,
    noOfVariationsAttempted,
    noOfVariationsPassed,
    trainStats,
  } = useStats({
    stats,
  })
  const { windowSize } = useWindowSize()

  let progressSize = 200
  if (windowSize >= 768) {
    progressSize = 250
  }

  const showableTrainStats = trainStats?.filter(
    (t) => t.distanceToNextGrade > 0 && (t.whiteSuccesses || 0) + (t.blackSuccesses || 0) > 0
  )

  function handleShowMore() {
    setShowLimit((oldLimit) => oldLimit + 3)
  }

  return (
    <div className="">
      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <div className="mb-8 flex w-full flex-wrap items-center 2xl:w-2/5">
            <div className="flex w-full flex-col items-center xs:w-1/2">
              <h4 className="text-md my-4 md:text-xl">Openings Mastered</h4>
              <ProgressCircle
                progress={
                  isVisible && openingGroups ? (noOfOpeningsMastered / noOfOpenings) * 100 : 0
                }
                showMastery
                strokeWidth={8}
                text={`${noOfOpeningsMastered} / ${noOfOpenings}`}
                width={progressSize}
              />
            </div>
            <div className="flex w-full flex-col items-center xs:w-1/2">
              <h4 className="text-md my-4 md:text-xl">Variations Mastered</h4>
              <ProgressCircle
                progress={
                  isVisible && openingGroups
                    ? (noOfOpeningVariationsMastered / noOfVariations) * 100
                    : 0
                }
                showMastery
                strokeWidth={8}
                text={`${noOfOpeningVariationsMastered} / ${noOfVariations}`}
                width={progressSize}
              />
            </div>
          </div>
        )}
      </VisibilitySensor>

      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
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
        )}
      </VisibilitySensor>

      <h4 className="text-md mb-4 text-center md:text-xl">Closest Milestones</h4>
      {trainStats.length === 0 && (
        <p className="text-center">
          Train some opening variations for your milestones to show here.
        </p>
      )}
      {showableTrainStats?.map(
        (t, i) =>
          i < showLimit && (
            <VisibilitySensor key={i} partialVisibility>
              {({ isVisible }) => <ProgressBar isVisible={isVisible} stats={t} />}
            </VisibilitySensor>
          )
      )}

      {showableTrainStats.length > showLimit && (
        <Button fill onClick={handleShowMore}>
          Show More
        </Button>
      )}
    </div>
  )
}
