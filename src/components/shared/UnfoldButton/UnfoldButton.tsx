import Expand from 'components/icons/Expand'
import React, { MouseEventHandler } from 'react'
import cn from 'clsx'
import styles from './UnfoldButton.module.scss'

export type UnfoldButtonProps = HTMLProps.button & {
  folded?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const UnfoldButton = ({ folded, className, ...props }: UnfoldButtonProps) => (
  <button
    className={cn(styles.UnfoldButton, className, folded && styles.folded)}
    {...props}
  >
    <Expand className={styles.Icon} />
  </button>
)

export default UnfoldButton
