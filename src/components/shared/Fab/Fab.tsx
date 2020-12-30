import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import cn from 'clsx'
import shape from './Fab.shape.svg'
import styles from './Fab.module.scss'
import useClipShape from 'hooks/use-clip-shape'

type CommonProps = {
  disabled?: boolean
  icon: React.ReactNode
}
export type FabProps = HTMLProps.button & CommonProps
export type FalProps = LinkProps & CommonProps

const Fab = ({ className, icon, disabled, ...props }: FabProps) => (
  useClipShape('fab', shape),
  (
    <button
      disabled={disabled}
      className={getClassNames(disabled, className)}
      {...props}
    >
      {icon}
    </button>
  )
)
export default Fab

export const Fal = ({ className, icon, disabled, to, ...props }: FalProps) => (
  useClipShape('fab', shape),
  (
    <Link
      to={disabled ? '#' : to}
      className={getClassNames(disabled, className)}
    >
      {icon}
    </Link>
  )
)

export const getClassNames = (disabled?: boolean, className?: string) =>
  cn(
    'w-14 h-14 p-2 fixed transition-color duration-100 md:hidden',
    disabled
      ? 'bg-disabled-700 cursor-default'
      : 'bg-primary-700 hover:bg-primary-600 active:bg-primary-800 cursor-pointer',
    className,
    styles.Fab,
  )
