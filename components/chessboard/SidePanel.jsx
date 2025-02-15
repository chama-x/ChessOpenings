import { BoardControls } from './BoardControls'

export function SidePanel({ children, showBoardControls = true, title }) {
  return (
    <div className="flex max-h-[80vh] min-h-[50vh] w-full max-w-[80vh] flex-col bg-secondary shadow-md xl:w-4/12">
      <div className="hidden bg-tertiary text-center xl:block">
        <h1 className="py-4 text-2xl">{title}</h1>
      </div>
      <div
        id="panel-scroll-display"
        className="order-2 mb-auto flex max-h-[80vh] grow flex-col overflow-y-auto p-2 md:p-4 xl:order-1"
      >
        {children}
      </div>
      {showBoardControls && <BoardControls resetDisabled={false} />}
      <div className="order-2 bg-tertiary text-center xl:hidden">
        <h1 className="py-4 text-2xl">{title}</h1>
      </div>
    </div>
  )
}
