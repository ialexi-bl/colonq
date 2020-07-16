import React, { ReactNode } from 'react'
import Title from '../Title'

export type PageTitleProps = {
  label: string
  icon: ReactNode
}

const PageTitle = ({ label, icon }: PageTitleProps) => (
  <Title level={1} className={'p-2 font-5 d-flex align-items-center my-5'}>
    <span className={'d-inline-block w-3 h-3 mr-2'}>{icon}</span>
    {label}
  </Title>
)
export default PageTitle
