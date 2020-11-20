import { RouteComponentProps } from 'config/routes'
import LessonsList from 'apps/shared/LessonsList'
import React from 'react'
import Suffixes from 'components/icons/dynamic/russian/suffixes'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <LessonsList
      app={'russian/suffixes'}
      icon={<Suffixes />}
      title={'Суффиксы'}
      {...controls}
    />
  )
}
