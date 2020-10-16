import { ScrollablePage } from 'components/shared/Page'
import PageTitle from 'components/shared/PageTitle'
import React from 'react'

export default function AppsList() {
  return (
    <ScrollablePage>
      <PageTitle>Темы</PageTitle>
      <div className={'px-4 pb-64'}>
        <h2 className={'text-3xl'}>Математика</h2>
      </div>
    </ScrollablePage>
  )
}
