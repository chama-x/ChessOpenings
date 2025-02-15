import { clear } from '../../data/icons'
import { SVG } from './SVG'

export function Modal({ title, onClose, children }) {
  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center">
        <div className="mx-4 w-full max-w-4xl">
          <div className="flex items-center rounded-t-md bg-tertiary text-center">
            <div className="flex w-14 items-center" />
            <h1 className="my-4 w-full text-xl lg:text-2xl">{title}</h1>
            <div className="flex w-14 items-center">
              <button onClick={onClose}>
                <SVG icon={clear} dimOnHover />
              </button>
            </div>
          </div>
          <div className="max-h-[70vh] overflow-y-auto break-words rounded-b-md bg-primary p-4">
            {children}
          </div>
        </div>
      </div>
      <div
        className="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-70"
        onClick={onClose}
      />
    </>
  )
}
