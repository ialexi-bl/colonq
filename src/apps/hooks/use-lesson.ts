import { AppErrorName, appHttpError } from 'apps/shared/AppError'
import { HttpError } from 'services/errors'
import { MixedDispatch } from 'store/types'
import { executeAuthorizedMethod } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Config from 'config'
import SessionApi from 'services/api/session'

type Status = 'loading' | 'retrying' | 'loaded' | 'error'
type Result<TProblem> =
  | {
      status: 'loading'
      error: AppErrorName | null
      problems: never[]
      retry: () => void
    }
  | {
      status: 'error' | 'retrying'
      error: AppErrorName
      problems: never[]
      retry: () => void
    }
  | {
      status: 'loaded'
      error: null
      problems: TProblem[]
      retry: () => void
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
  const [error, setError] = useState<AppErrorName | null>(null)

  const load = () => {
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
        setError(null)
      })
      .catch(async (error) => {
        if (Config.IS_DEV) console.error(error)
        setStatus('error')

        setError(
          error instanceof HttpError ? await appHttpError(error) : 'unknown',
        )
      })
  }

  // Fetching session data
  useEffect(load, [app, dispatch, lesson])

  return {
    error,
    status,
    problems,
    retry: () => {
      setStatus('retrying')
      load()
    },
  } as Result<TProblem>
}
