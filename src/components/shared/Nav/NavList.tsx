import { NavItem } from './NavItem'
import { ParentSection, Section, appsMap } from 'config/apps-map'
import { useCurrentLocation } from 'hooks/shared/use-current-location'
import React, { CSSProperties } from 'react'
import cn from 'clsx'
import styles from './Nav.module.scss'

export type NavListProps = {
  section: ParentSection
  newTitleLocation?: string
  startTransition?: (
    e: React.MouseEvent<HTMLElement>,
    section: Section,
  ) => unknown
  newTitleRef?: React.Ref<HTMLLIElement>
  isOld?: boolean
  isNew?: boolean
  tabIndex?: number
  itemsStyle?: CSSProperties
}

const NavList = (
  {
    section,
    newTitleLocation,
    startTransition,
    newTitleRef,
    isNew,
    isOld,
    itemsStyle,
    tabIndex,
  }: NavListProps,
  ref: React.Ref<HTMLUListElement>,
) => {
  const location = useCurrentLocation()

  return (
    <ul
      className={cn(styles.List, {
        [styles.ListOld]: isOld,
        [styles.ListNew]: isNew,
      })}
      ref={ref}
    >
      {section.items.map((child, i) => {
        const item = appsMap[child]
        const isNewTitle = item.location === newTitleLocation

        return (
          <NavItem
            tabIndex={tabIndex}
            key={item.location + i}
            startTransition={startTransition}
            section={item}
            active={item.location === location}
            newTitle={isNewTitle}
            style={itemsStyle}
            ref={isNewTitle ? newTitleRef : undefined}
          >
            {item.title}
          </NavItem>
        )
      })}
    </ul>
  )
}

const Component = React.memo(React.forwardRef(NavList))
export { Component as NavList }
