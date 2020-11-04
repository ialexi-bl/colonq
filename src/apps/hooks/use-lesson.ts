import { HttpError } from 'services/errors'
import { useEffect, useState } from 'react'
import Config from 'config'
import SessionApi from 'services/api/session'
import useApiClient from 'hooks/use-api-client'

type Result<TProblem> =
  | {
      status: 'loading' | 'error' | 'not-found'
      problems: null
    }
  | {
      status: 'loaded'
      problems: TProblem[]
    }

export const PRACTICE: unique symbol = Symbol('practice')
export default function useLesson<TProblem>(
  app: string,
  lesson: string | typeof PRACTICE,
) {
  const [data, setData] = useState<Result<TProblem>>({
    status: 'loading',
    problems: null,
  })
  const { executeAuthorized } = useApiClient()

  useEffect(() => {
    executeAuthorized(
      lesson === PRACTICE
        ? SessionApi.getPracticeLesson<TProblem>(app)
        : SessionApi.getLesson<TProblem>(app, lesson),
    )
      .then(({ data: { problems } }) => {
        setData({ status: 'loaded', problems })
      })
      .catch((error) => {
        if (error instanceof HttpError && error.status === 404) {
          return setData({ status: 'not-found', problems: null })
        }

        if (Config.IS_DEV) console.error(error)
        setData({ status: 'error', problems: null })
      })
  }, [app, executeAuthorized, lesson])

  return data
}
