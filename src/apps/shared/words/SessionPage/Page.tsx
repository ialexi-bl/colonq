import { ApiErrorName } from 'services/api/config'
import { ProblemWithAnswer, WordsNext } from './types'
import { RouteComponentProps } from 'config/routes'
import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import AppError from 'apps/shared/AppError'
import NotFound from 'components/pages/NotFound'
import React, { ComponentType, useEffect } from 'react'
import WordsSession from './Session'
import useLesson, { PRACTICE } from 'apps/hooks/use-lesson'

export type SessionProps<
  TProblem extends ProblemWithAnswer
> = RouteComponentProps & {
  wordView: ComponentType<TwoLatestDisplayViewProps<TProblem, WordsNext>>
  lesson: string | typeof PRACTICE
  app: string
}

export default function WordsSessionPage<TProblem extends ProblemWithAnswer>({
  lesson: lessonName,
  setProgress,
  wordView,
  visible,
  app,
}: SessionProps<TProblem>) {
  const lesson = useLesson<TProblem>(app, lessonName)

  useEffect(() => {
    if (lesson.status !== 'loading') {
      setProgress(100)
    }
  }, [setProgress, lesson.status])

  switch (lesson.status) {
    case 'loaded':
      return (
        <WordsSession
          app={app}
          visible={visible}
          wordView={wordView}
          problems={lesson.problems}
          setProgress={setProgress}
        />
      )
    case 'loading':
      return null
    case ApiErrorName.NOT_FOUND:
      // TODO: be more precise
      return <NotFound />
    case ApiErrorName.FORBIDDEN:
      return <AppError type={'locked'} id={app} />
    case ApiErrorName.NO_PROBLEMS_ERROR:
      return <AppError type={'no-problems'} id={app} />
    default:
      return <AppError id={app} />
  }
}
