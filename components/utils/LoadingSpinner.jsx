export function LoadingSpinner({ img, text }) {
  return (
    <div className="my-auto flex flex-col items-center">
      <div className="animate-spinner">{img}</div>
      <p className="mt-4 text-center">{text}</p>
    </div>
  )
}
