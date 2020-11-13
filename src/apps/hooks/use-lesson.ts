import { ApiErrorName } from 'services/client/config'
import { HttpError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { closeLoading, openLoading } from 'store/view'
import { executeAuthorizedMethod } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Config from 'config'
import SessionApi from 'services/api/session'

type Status = 'loading' | 'loaded' | 'error' | ApiErrorName
type Result<TProblem> =
  | {
      status: Exclude<Status, 'loaded'>
      problems: never[]
    }
  | {
      status: 'loaded'
      problems: TProblem[]
    }

export const PRACTICE: unique symbol = Symbol('practice')
export type LessonType = string | typeof PRACTICE

export default function useLesson<TProblem>(
  app: string,
  lesson: string | typeof PRACTICE,
): Result<TProblem> {
  const dispatch = useDispatch<MixedDispatch>()
  const [status, setStatus] = useState<Status>('loading')
  const [problems, setProblems] = useState<TProblem[]>([])

  // Fetching session data
  useEffect(() => {
    dispatch(openLoading('use-lesson'))
    dispatch(
      executeAuthorizedMethod(
        lesson === PRACTICE
          ? SessionApi.getPracticeLesson<TProblem>(app)
          : SessionApi.getLesson<TProblem>(app, lesson),
      ),
    )
      .then(({ data: { problems } }) => {
        setProblems(problems)
        setStatus('loaded')
      })
      .catch(async (error) => {
        if (error instanceof HttpError) {
          const name = await error.getApiName()
          return setStatus(name)
        }

        if (Config.IS_DEV) console.error(error)
        setStatus('error')
      })
      .then(() => {
        dispatch(closeLoading('use-lesson'))
      })
  }, [app, dispatch, lesson])

  return { status, problems } as Result<TProblem>
}
