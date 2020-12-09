import AppError from 'apps/shared/AppError'
import React from 'react'
import useLesson, { LessonType } from 'apps/hooks/use-lesson'

export type SessionProps<TProblem> = {
  app: string
  lesson: LessonType
  component: React.ComponentType<{ problems: TProblem[] }>
}
export type ProblemsConsumerProps<TProblem> = {
  problems: TProblem[]
}

export default function ProblemsProvider<TProblem>({
  app,
  lesson: lessonName,
  component: Component,
}: SessionProps<TProblem>) {
  const lesson = useLesson<TProblem>(app, lessonName)

  switch (lesson.status) {
    case 'loaded':
      return <Component problems={lesson.problems} />
    case 'loading':
      return null
    // TODO: fix
    case 'error':
      return <AppError id={app} />
  }
}
