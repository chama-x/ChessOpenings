import Link from 'next/link'

export function Button({ children, disabled, error, fill, onClick }) {
  return (
    <button
      className={`flex items-center justify-center rounded-md px-2 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50 md:text-xl ${
        error ? 'bg-error hover:opacity-50' : 'bg-theme hover:bg-theme-hover'
      } ${fill ? 'w-full' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function WarningButton(props) {
  return <Button error {...props} />
}

export function LinkButton(props) {
  return (
    <Link href={props.link} className={props.fill ? 'w-full' : ''}>
      <Button {...props} />
    </Link>
  )
}

export function ExternalLinkButton(props) {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <Button {...props} />
    </a>
  )
}
