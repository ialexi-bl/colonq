import React from 'react'
import styles from './Nav.module.scss'

const NavListContainer = ({
  children,
  scrollerRef,
}: {
  children: React.ReactNode
  scrollerRef?: React.Ref<HTMLDivElement>
}) => {
  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListScroller} ref={scrollerRef}>
        {children}
      </div>
    </div>
  )
}

const Component = React.memo(NavListContainer)
export { Component as NavListContainer }
