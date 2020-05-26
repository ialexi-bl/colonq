import React, { HTMLAttributes } from 'react'
import cn from 'clsx'
import styles from './Title.module.scss'

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Heading with changeable level
 * @param props
 */
export function Title({ level, className, ...props }: TitleProps) {
  const H = `h${level}` as 'h1'
  return <H className={cn(styles.Title, className)} {...props} />
}
