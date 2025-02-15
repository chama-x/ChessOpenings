import { useEffect } from 'react'
import { useCountUp } from 'react-countup'

export function CountUp({ duration, label, value }) {
  const { reset, start } = useCountUp({ ref: `${label}-counter`, duration, end: value })

  useEffect(() => {
    reset()
    start()
  }, [value, reset, start])

  return (
    <div className="flex w-full flex-col items-center">
      <h4 className="mb-4 text-center text-sm md:text-xl">{label}</h4>
      <span id={`${label}-counter`} className="text-5xl" />
    </div>
  )
}
