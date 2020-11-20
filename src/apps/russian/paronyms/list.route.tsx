import { RouteComponentProps } from 'config/routes'
import LessonsList from 'apps/shared/LessonsList'
import Paronyms from 'components/icons/dynamic/russian/paronyms'
import React from 'react'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <LessonsList
      app={'russian/paronyms'}
      icon={<Paronyms />}
      title={'Паронимы'}
      {...controls}
    />
  )
}
