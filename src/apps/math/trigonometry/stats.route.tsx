import { RouteComponentProps } from 'config/routes'
import React from 'react'
import WordsLessonsList from 'apps/shared/words/LessonsList/WordsLessonsList'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <WordsLessonsList
      app={'math/trigonometry'}
      title={'Тригонометрия'}
      {...controls}
    />
  )
}
