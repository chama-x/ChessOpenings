import { trainFilled } from '../../data/icons'
import { OPENING_GRADES, TROPHY_COLOURS } from '../../data/consts'

export function ProgressBar({ isVisible, stats }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center text-sm md:text-base">{stats.opening}</div>
        <div className="ml-auto flex text-sm md:text-base">
          <p className="text-theme">{`${stats.distanceToNextGrade} ${
            stats.distanceToNextGrade === 1 ? 'pass' : 'passes'
          } until ${Object.keys(OPENING_GRADES)[stats.gradeAchievedIndex + 1]}`}</p>
          <svg
            fill={Object.values(TROPHY_COLOURS)[stats.gradeAchievedIndex + 1].colour}
            className="mx-1 h-full"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            {trainFilled}
          </svg>
        </div>
      </div>
      <div className="bg-primaryhover flex h-6 rounded-md">
        <div
          className="mr-auto flex h-full justify-end rounded-md bg-theme px-4 text-white transition-all duration-1000"
          style={{
            width: isVisible
              ? `${
                  stats.whiteSuccesses !== undefined
                    ? (stats.whiteSuccesses / (stats.whiteSuccesses + stats.distanceToNextGrade)) *
                      100
                    : (stats.blackSuccesses / (stats.blackSuccesses + stats.distanceToNextGrade)) *
                      100
                }%`
              : '0%',
          }}
        >
          {stats.whiteSuccesses !== undefined ? stats.whiteSuccesses : stats.blackSuccesses}
        </div>
      </div>
    </div>
  )
}
