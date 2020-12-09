import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsLessonsList from 'apps/shared/words/LessonsList/WordsLessonsList'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <WordsLessonsList
      app={'russian/prefixes'}
      title={'Приставки и правописание Ъ и Ь'}
      {...controls}
    />
  )
}
