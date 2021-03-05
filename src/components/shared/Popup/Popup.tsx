import { ReactNode } from 'react'
import cn from 'clsx'

export type PopupProps = {
  children?: ReactNode
  shown?: unknown
}

export default function Popup({ children, shown }: PopupProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 duration-500 transform bg-secondary-900',
        !shown && 'translate-y-full',
      )}
    >
      {children}
    </div>
  )
}
