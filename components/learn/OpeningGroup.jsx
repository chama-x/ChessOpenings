import { Chessboard } from 'react-chessboard'
import Chess from 'chess.js'
import Link from 'next/link'

import { openingChoices } from '../../data/consts'
import { useChessboardSize } from '../../functions/hooks'

export function OpeningGroup({ group, type }) {
  const { chessboardSize } = useChessboardSize()

  function getFen() {
    const fen = openingChoices.find((o) => o.label === group.label)
    if (fen) return fen.fen
    const game = new Chess()
    const opening = group.options[0].value
    for (let i = 0; i < 4; i++) {
      game.move({ from: opening[i].from, to: opening[i].to })
    }
    return game.fen()
  }

  return (
    <div className="my-4 w-full px-2 xs:w-1/2 lg:px-4 xl:w-1/4">
      <Link href={`/${type}/${encodeURIComponent(group.label)}`} className="block">
        <div className="transform shadow-md transition duration-100 ease-in-out hover:scale-105">
          <div id="board" className="flex bg-secondary p-2 text-sm sm:text-lg">
            <h3>{group.label}</h3>
            <h3 className="ml-auto">{group.options.length}</h3>
          </div>
          <div className="relative z-10" style={{ minHeight: chessboardSize }}>
            <Chessboard
              position={getFen()}
              boardWidth={chessboardSize}
              customDarkSquareStyle={{ backgroundColor: 'var(--theme)' }}
              customLightSquareStyle={{ backgroundColor: 'var(--theme-secondary)' }}
              arePiecesDraggable={false}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
