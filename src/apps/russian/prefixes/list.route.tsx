import { RouteComponentProps } from 'config/routes'
import LessonsList from 'apps/shared/LessonsList'
import Prefixes from 'components/icons/dynamic/russian/prefixes'
import React from 'react'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <LessonsList
      app={'russian/prefixes'}
      icon={<Prefixes />}
      title={'Приставки и правописание Ъ и Ь'}
      {...controls}
    />
  )
}
