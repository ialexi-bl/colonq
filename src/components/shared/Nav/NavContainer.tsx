import { State } from './Nav'
import React from 'react'
import cn from 'clsx'
import styles from './Nav.module.scss'

export type NavContainerProps = {
  open?: boolean
  animating?: State
  children?: React.ReactNode
  out?: boolean
}

const NavContainer = (
  { open, animating, children, out }: NavContainerProps,
  ref: React.Ref<HTMLDivElement>,
) => (
  <nav
    ref={ref}
    className={cn(styles.Nav, {
      [styles.NavOpen]: open,
      [styles.NavAnimating]: animating === State.ANIMATE,
      [styles.NavAnimatingPrepare]: animating === State.PREPARE,
      [styles.NavAnimatingOut]: animating !== State.STATIC && out,
      [styles.NavAnimatingIn]: animating !== State.STATIC && !out,
    })}
    children={children}
  />
)
const Component = React.memo(React.forwardRef(NavContainer))

export { Component as NavContainer }
