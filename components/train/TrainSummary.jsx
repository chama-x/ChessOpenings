import { useEffect } from 'react'
import Link from 'next/link'

import { learnOutlined } from '../../data/icons'
import { SVG } from '../utils/SVG'

export function TrainSummary({ openingsCompleted, openingsFailed }) {
  useEffect(() => {
    document.getElementById('summary').scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <div>
      <h1 id="summary" className="my-4 text-center text-2xl">
        Training Summary
      </h1>
      <h2 className="text-xl text-success">Openings Completed: {openingsCompleted.length}</h2>
      {openingsCompleted.map((opening) => (
        <div key={opening.label} className="flex py-2">
          {opening.label}
        </div>
      ))}
      <h2 className="mt-4 text-xl text-error">Openings Failed: {openingsFailed.length}</h2>
      {openingsFailed.map((opening) => (
        <div key={opening.label} className="flex py-2">
          <div className="flex flex-grow items-center">{opening.label}</div>
          <Link
            href={{
              pathname: `/learn/${encodeURIComponent(opening.label.split(':')[0])}`,
              query: { openingLink: opening.label },
            }}
          >
            <a className="flex items-center rounded-md p-2 hover:bg-tertiary">
              <SVG icon={learnOutlined} size={24} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
