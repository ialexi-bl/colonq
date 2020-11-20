import { RouteComponentProps } from 'config/routes'
import LessonsList from 'apps/shared/LessonsList'
import React from 'react'
import Verbs from 'components/icons/dynamic/russian/verbs'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <LessonsList
      app={'russian/verbs'}
      icon={<Verbs />}
      title={'Окончания глаголов и суффиксы причастий'}
      {...controls}
    />
  )
}
