import { ChessboardProvider } from '../../context/board-context'

export function ChessboardWrapper({ children }) {
  return (
    <div className="container my-4 flex flex-wrap justify-center xl:max-h-[80vh]">
      <ChessboardProvider>{children}</ChessboardProvider>
    </div>
  )
}
