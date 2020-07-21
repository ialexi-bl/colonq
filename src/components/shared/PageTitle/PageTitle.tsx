import React, { ReactNode } from 'react'
import Title from '../Title'
import cn from 'clsx'

export type PageTitleProps = Childfree<HTMLProps.heading> & {
  label: string
  icon: ReactNode
}

const PageTitle = ({ label, icon, className, ...props }: PageTitleProps) => (
  <Title
    level={1}
    className={cn(className, 'p-2 text-4xl flex items-center my-5')}
    {...props}
  >
    <span className={'d-inline-block w-12 h-12 mr-2'}>{icon}</span>
    {label}
  </Title>
)
export default PageTitle
