import { Elevation } from 'config/view'
import { ProblemWithAnswer, WordsNext } from './types'
import { RouteComponentProps } from 'config/routes'
import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import AppError from 'apps/shared/AppError'
import Page from 'components/shared/Page'
import React, { ComponentType, useEffect } from 'react'
import WordsSession from './WordsSession'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'
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
  useElevation(Elevation.session)
  const lesson = useLesson<TProblem>(app, lessonName)

  useEffect(() => {
    if (lesson.status !== 'loading') {
      setProgress(100)
    }
  }, [setProgress, lesson.status])

  useIsAuthenticated()

  if (!visible || lesson.status === 'loading') return null
  if (lesson.status !== 'loaded') {
    return (
      <Wrapper>
        <AppError
          id={app}
          type={lesson.error}
          retry={lesson.retry}
          retrying={lesson.status === 'retrying'}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <WordsSession
        app={app}
        visible={visible}
        wordView={wordView}
        problems={lesson.problems}
        setProgress={setProgress}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }: BasicProps) => (
  <Page routeElevation={Elevation.session} className={'route-overlay bg-page'}>
    {children}
  </Page>
)
