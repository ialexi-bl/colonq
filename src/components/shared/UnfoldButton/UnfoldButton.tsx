import { CleanButton } from '../Button'
import { Unfold } from 'components/icons/Unfold'
import React, { MouseEventHandler } from 'react'
import cn from 'clsx'
import styles from './UnfoldButton.module.scss'

export default function UnfoldButton({
  folded,
  onClick,
  className,
}: {
  folded?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}) {
  return (
    <CleanButton
      onClick={onClick}
      className={cn(styles.UnfoldButton, className, folded && styles.folded)}
    >
      <Unfold className={styles.Icon} />
    </CleanButton>
  )
}
