import Accents from 'components/icons/dynamic/russian/accents'
import LessonsList from 'apps/shared/LessonsList'
import React from 'react'

export default function ListRoute() {
  return (
    <LessonsList
      app={'russian/accents'}
      icon={<Accents />}
      title={'Ударения'}
    />
  )
}
