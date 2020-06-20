import { CleanButton } from 'components/shared/Button'
import { Link } from 'react-router-dom'
import { Section } from 'config/apps-map'
import { app } from 'config/routes'
import React, { CSSProperties, useCallback } from 'react'
import cn from 'clsx'
import styles from './Nav.module.scss'

export type NavItemProps = {
  section: Section
  newTitle?: boolean
  children?: React.ReactNode
  style?: CSSProperties
  tabIndex?: number
  active?: boolean
  startTransition?: (
    e: React.MouseEvent<HTMLElement>,
    location: Section,
  ) => unknown
}

const NavItem = (
  {
    startTransition,
    newTitle,
    active,
    section,
    children,
    style,
    tabIndex,
  }: NavItemProps,
  ref: React.Ref<HTMLLIElement>,
) => {
  const onClick = useCallback((e) => startTransition?.(e, section), [
    section,
    startTransition,
  ])
  const props = {
    onClick,
    children,
    tabIndex,
    className: styles.ItemButton,
  }
  const view = section.leaf ? (
    <Link to={app(section.location)} {...props} />
  ) : (
    <CleanButton {...props} />
  )

  return (
    <li
      ref={ref}
      style={style}
      className={cn(styles.Item, {
        [styles.ItemNewTitle]: newTitle,
        [styles.ItemActive]: active,
      })}
    >
      {view}
    </li>
  )
}

const Component = React.forwardRef(NavItem)
export { Component as NavItem }
