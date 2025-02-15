export function Splitter({ text }) {
  return (
    <div className="flex items-center justify-center">
      <div className="m-4 h-1 w-full rounded-md bg-theme" />
      {text && <p className="absolute bg-primary px-4">{text}</p>}
    </div>
  )
}
