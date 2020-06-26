import { CleanButton } from '../Button'
import { Unfold } from 'components/icons/Unfold'
import React, { MouseEventHandler } from 'react'
import cn from 'clsx'
import styles from './UnfoldButton.module.scss'

export type UnfoldButtonProps = HTMLProps.button & {
  folded?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const UnfoldButton = ({ folded, className, ...props }: UnfoldButtonProps) => (
  <CleanButton
    className={cn(styles.UnfoldButton, className, folded && styles.folded)}
    {...props}
  >
    <Unfold className={styles.Icon} />
  </CleanButton>
)

export default UnfoldButton
