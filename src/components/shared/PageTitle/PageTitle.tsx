import React, { ReactNode } from 'react'
import cn from 'clsx'

export type PageTitleProps = Childfree<HTMLProps.heading> & {
  children: string
  icon?: ReactNode
}

const PageTitle = ({ children, icon, className, ...props }: PageTitleProps) => (
  <h1
    className={cn(className, 'py-2 px-4 text-4xl flex items-center my-6')}
    {...props}
  >
    {icon && <span className={'d-inline-block w-12 h-12 mr-4'}>{icon}</span>}
    {children}
  </h1>
)
export default PageTitle
