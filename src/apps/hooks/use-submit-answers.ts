import { ApiResponse } from 'services/api/config'
import { MixedDispatch } from 'store/types'
import { ProblemWithAnswer } from 'apps/shared/SessionPage'
import { appsList } from 'config/routes'
import { executeAuthorizedMethod, updateLessons } from 'store/user'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import SessionApi from 'services/api/session'

const emptyArray: string[] = []
export default function useSubmitAnswers(
  app: string,
  done: boolean,
  answers: ProblemWithAnswer[],
  disabled: string[] = emptyArray,
) {
  const dispatch = useDispatch<MixedDispatch>()
  const [
    submitResponse,
    setSubmitResponse,
  ] = useState<ApiResponse.Session.Submit | null>(null)

  useEffect(() => {
    if (!done) return

    dispatch(
      executeAuthorizedMethod(SessionApi.submitAnswers(app, answers, disabled)),
    )
      .then((response) => {
        setSubmitResponse(response.data)
        dispatch(
          updateLessons({
            app,
            lessons: response.data.lessons,
          }),
        )
      })
      .catch((e) => {
        dispatch(notifyErrorObject(e))
        dispatch(push(appsList()))
      })
  }, [answers, app, disabled, dispatch, done])

  return submitResponse
}
