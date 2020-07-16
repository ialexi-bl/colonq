import React, { HTMLAttributes, forwardRef } from 'react'
import cn from 'clsx'
import styles from './Title.module.scss'

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  centered?: boolean
}

/**
 * Heading with changeable level
 * @param props
 */
const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { level, className, centered, ...props },
  ref,
) {
  const H = `h${level}` as 'h1'
  return (
    <H
      className={cn(styles.Title, styles[H], className, {
        [styles.centered]: centered,
      })}
      ref={ref}
      {...props}
    />
  )
})
export default Title
