import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsLessonsList from 'apps/shared/words/LessonsList/WordsLessonsList'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <WordsLessonsList
      app={'russian/verbs'}
      title={'Окончания глаголов и суффиксы причастий'}
      {...controls}
    />
  )
}
