import React from 'react'
import cn from 'clsx'
import shape from './Fab.shape.svg'
import styles from './Fab.module.scss'
import useClipShape from 'hooks/shared/use-clip-shape'

export type FabProps = HTMLProps.button & {
  disabled?: boolean
  icon: React.ReactNode
}

const Fab = ({ className, icon, disabled, onClick, ...props }: FabProps) => (
  useClipShape('fab', shape),
  (
    <button
      className={cn(
        'w-12 h-12 p-1 fixed transition-color duration-100',
        disabled
          ? 'bg-disabled-700 cursor-default'
          : 'bg-primary-700 cursor-pointer',
        className,
        styles.Fab,
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {icon}
    </button>
  )
)
export default Fab
