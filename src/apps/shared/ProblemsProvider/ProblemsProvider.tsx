import { ApiErrorName } from 'services/client/config'
import AppError from 'apps/shared/AppError'
import AppLocked from '../AppLocked'
import NotFound from 'components/pages/NotFound'
import React, { ComponentType } from 'react'
import useLesson, { LessonType } from 'apps/hooks/use-lesson'

export type SessionProps<TProblem> = {
  app: string
  lesson: LessonType
  consumer: ComponentType<ProblemsConsumerProps<TProblem>>
}
export type ProblemsConsumerProps<TProblem> = {
  problems: TProblem[]
}

export default function ProblemsProvider<TProblem>({
  app,
  lesson: lessonName,
  consumer: Consumer,
}: SessionProps<TProblem>) {
  const lesson = useLesson<TProblem>(app, lessonName)

  switch (lesson.status) {
    case 'loaded':
      return <Consumer problems={lesson.problems} />
    case 'loading':
      return null
    case ApiErrorName.NOT_FOUND:
      // TODO: be more precise
      return <NotFound />
    case ApiErrorName.FORBIDDEN:
      return <AppLocked />
    default:
      return <AppError id={app} />
  }
}