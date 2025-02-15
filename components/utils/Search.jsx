import { search } from '../../data/icons'
import { SVG } from './SVG'

export function Search({ id, maxLength = 255, onChange, placeholder, value }) {
  return (
    <div className="relative my-4">
      <span className="absolute p-2">
        <SVG icon={search} size={24} />
      </span>
      <input
        id={id}
        className=" w-full rounded-md bg-secondary pl-10 leading-10"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        maxLength={maxLength}
      />
    </div>
  )
}
