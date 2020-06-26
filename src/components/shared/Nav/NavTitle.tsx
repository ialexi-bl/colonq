import { Back } from 'components/icons/Back'
import { CleanButton } from 'components/shared/Button'
import { Section } from 'config/apps-map'
import React, { useCallback } from 'react'
import cn from 'clsx'
import styles from './Nav.module.scss'

export type NavTitleProps = Omit<
  HTMLProps.button,
  'onClick' | 'placeholder'
> & {
  section: Section
  placeholder?: boolean
  startTransition?: (
    e: React.MouseEvent<HTMLElement>,
    section: Section,
    title?: boolean,
  ) => unknown
}

const NavTitle = ({
  className,
  startTransition,
  section,
  placeholder,
  ...props
}: NavTitleProps) => {
  const onClick = useCallback((e) => startTransition?.(e, section, true), [
    section,
    startTransition,
  ])

  return (
    <CleanButton
      className={cn(styles.Item, styles.ItemTitle, className, {
        [styles.ItemPlaceholder]: placeholder,
      })}
      onClick={onClick}
      {...props}
    >
      <Back className={styles.BackButton} />
      <span className={styles.ItemButton}>{section.title || 'Sections'}</span>
    </CleanButton>
  )
}

const Component = React.memo(NavTitle)
export { Component as NavTitle }
