import { errorOutlined } from '../../data/icons'
import { SVG } from './SVG'

export function ErrorMessage({ children, showIcon = true }) {
  return (
    <div className="my-2 flex items-center justify-center rounded-md border-2 p-2 text-error">
      {showIcon && <SVG fill="error" icon={errorOutlined} marginRight={2} />}
      {children}
    </div>
  )
}
