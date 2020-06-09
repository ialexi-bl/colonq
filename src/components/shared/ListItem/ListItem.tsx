import { Add } from 'components/icons/Add'
import { Checkbox, CheckboxProps } from 'components/form/Checkbox'
import { CleanButton } from 'components/shared/Button'
import { Unfold } from 'components/icons/Unfold'
import { useRipples } from 'hooks/useRipples'
import React, { HTMLAttributes, useCallback } from 'react'
import cn from 'clsx'
import styles from './ListItem.module.scss'

export const listItemHeight = styles.height

export const ListItem = React.forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className, styles.ListItem)} {...props} />
))
export const ListItemNew = ({
  onClick,
  className,
  ...props
}: Omit<HTMLProps.button, 'clidren'>) => {
  const [makeRipple, ripples] = useRipples()
  const click = useCallback(
    (e) => {
      makeRipple(e)
      onClick?.(e)
    },

    [makeRipple, onClick],
  )
  return (
    <CleanButton
      tabIndex={0}
      onClick={click}
      className={cn(styles.ListItem, styles.ListItemNew, className)}
      {...props}
    >
      {ripples}
      <Add className={styles.ListItemNewIcon} />
    </CleanButton>
  )
}

export const ListCheckbox = ({
  children,
  ...props
}: CheckboxProps & { children?: React.ReactNode }) => (
  <label className={styles.ListCheckboxLabel}>
    <Checkbox {...props} />
    {children}
  </label>
)

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

export const ListDelete = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}) => (
  <CleanButton onClick={onClick} className={styles.ListDelete}>
    ×
  </CleanButton>
)
