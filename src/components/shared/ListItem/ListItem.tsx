import { Checkbox, CheckboxProps } from 'components/form/Checkbox'
import { CleanButton } from 'components/shared/Button'
import { Unfold } from 'components/icons/Unfold'
import React, { HTMLAttributes } from 'react'
import cn from 'clsx'
import styles from './ListItem.module.scss'

export const listItemHeight = styles.height

// TODO: replace with `Box`
export const ListItem = React.forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className, styles.ListItem)} {...props} />
))

// TODO: replace with `Checkbox`
export const ListCheckbox = ({
  children,
  ...props
}: CheckboxProps & { children?: React.ReactNode }) => (
  <label className={styles.ListCheckboxLabel}>
    <Checkbox {...props} />
    {children}
  </label>
)

// TODO: replace with `UnfoldButton`
export const ListUnfold = ({
  folded,
  onClick,
}: {
  folded?: boolean
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}) => (
  <CleanButton
    onClick={onClick}
    className={cn(styles.ListUnfold, folded && styles.ListUnfoldFolded)}
  >
    <Unfold className={styles.Icon} />
  </CleanButton>
)
