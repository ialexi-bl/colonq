import React from 'react'
import cn from 'clsx'

export function Box({ className, ...props }: HTMLProps.div) {
  return <div className={cn(className)} {...props} />
}
