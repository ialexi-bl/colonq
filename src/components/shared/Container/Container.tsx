import React from 'react'
import cn from 'clsx'

const Container = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn('container mx-auto', className)} {...props} />
)
export default Container
