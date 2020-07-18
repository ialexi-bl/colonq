import React, { HTMLAttributes, forwardRef } from 'react'

// TODO: delete
export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Heading with changeable level
 * @param props
 */
const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { level, className, ...props },
  ref,
) {
  const H = `h${level}` as 'h1'
  return <H className={className} ref={ref} {...props} />
})
export default Title
