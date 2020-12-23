import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { Helmet } from 'react-helmet'
import { ReactNode, useEffect } from 'react'
import { RouteComponentProps } from 'config/routes'
import { useSelector } from 'react-redux'
import AppError from '../AppError'
import Page from 'components/shared/Page'
import useAppTitle from 'hooks/use-app-title'
import useElevation from 'hooks/use-elevation'
import useIsAuthenticated from 'hooks/use-is-authenticated'
import useLesson, { PRACTICE } from 'apps/hooks/use-lesson'

export type ProblemWithAnswer = {
  id: string
  answer: string | number
}
export type SessionPageProps<
  TProblem extends ProblemWithAnswer
> = RouteComponentProps & {
  render: (problems: TProblem[]) => ReactNode
  lesson: string | typeof PRACTICE
  app: string
}

export default function SessionPage<TProblem extends ProblemWithAnswer>({
  lesson: lessonName,
  setProgress,
  visible,
  render,
  app,
}: SessionPageProps<TProblem>) {
  useElevation(Elevation.session)
  const lesson = useLesson<TProblem>(app, lessonName)
  const title = useAppTitle(app)

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
        <Helmet>
          <title>Ошибка - Занятие {title}</title>
        </Helmet>
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
      <Helmet>
        <title>Занятие {title}</title>
      </Helmet>
      {render(lesson.problems)}
    </Wrapper>
  )
}

const Wrapper = ({ children }: BasicProps) => (
  <Page routeElevation={Elevation.session} className={'route-overlay bg-page'}>
    {children}
  </Page>
)
