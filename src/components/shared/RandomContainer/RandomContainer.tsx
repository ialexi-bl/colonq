import { cssUtil } from 'styles'
import React, { useMemo } from 'react'
import cn from 'clsx'

const classNames = [
  cssUtil.routeTransitionRight,
  cssUtil.routeTransitionLeft,
  cssUtil.routeTransitionUp,
  cssUtil.routeTransitionDown,
]
export default ({ className, ...props }: DivProps) => {
  const animation = useMemo(() => Math.floor(Math.random() * 4), [])
  return <div className={cn(classNames[animation], className)} {...props} />
}
