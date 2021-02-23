import { AppErrorName, appHttpError } from 'apps/shared/AppError'
import { HttpError } from 'core/errors'
import { MixedDispatch } from 'store/types'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Config from 'config'
import SessionsService from 'core/api/services/session'

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

export const PRACTICE: unique symbol =
  typeof Symbol === 'undefined' ? ({} as any) : Symbol('practice')
export type LessonType = string | typeof PRACTICE

// TODO: extract to a more general hook
/**
 * Handles lesson fetching
 * @param app - App id
 * @param lesson - Lesson name (or PRACTICE symbol for practice)
 */
export default function useLesson<TProblem>(
  app: string,
  lesson: string | typeof PRACTICE,
): Result<TProblem> {
  const dispatch = useDispatch<MixedDispatch>()
  const [status, setStatus] = useState<Status>('loading')
  const [problems, setProblems] = useState<TProblem[]>([])
  const [error, setError] = useState<AppErrorName | null>(null)

  const load = () => {
    const promise =
      lesson === PRACTICE
        ? SessionsService.getPracticeLesson<TProblem>(app)
        : SessionsService.getLesson<TProblem>(app, lesson)

    promise
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
