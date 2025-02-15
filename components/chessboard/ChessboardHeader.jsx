import { useRouter } from 'next/router'

export function ChessboardHeader({ opening }) {
  const { pathname } = useRouter()

  return (
    <p id="board" className="w-full pb-2 text-center text-xs md:text-lg">
      {opening
        ? opening.label
        : pathname.includes('/train')
          ? 'Select Opening to Train and Press Start to Begin'
          : 'Select Opening to Begin'}
    </p>
  )
}
