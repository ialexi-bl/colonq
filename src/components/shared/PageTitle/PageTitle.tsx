import React, { ReactNode } from 'react'
import Title from '../Title'

export type PageTitleProps = {
  label: string
  icon: ReactNode
}

const PageTitle = ({ label, icon }: PageTitleProps) => (
  <Title level={1} className={'p-2 text-4xl flex items-center my-5'}>
    <span className={'d-inline-block w-12 h-12 mr-2'}>{icon}</span>
    {label}
  </Title>
)
export default PageTitle
