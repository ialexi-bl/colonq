import { Api } from 'core/api/config'
import { MixedDispatch } from 'store/types'
import { ProblemWithAnswer } from 'apps/shared/SessionPage'
import { appsList } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { updateLessons } from 'store/user'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import SessionsService from 'core/api/services/session'

const emptyArray: string[] = []

/**
 * Handles answers submission
 * NOTE: last three parameters for now come from
 * `useTwoLatestProblemControls` hook but a similar
 * one may be used in future
 * @param app - App id
 * @param done - true if session has been finished
 * @param answers - Answers list
 * @param disabled - Disabled problems IDs
 */
export default function useSubmitAnswers(
  app: string,
  done: boolean,
  answers: ProblemWithAnswer[],
  // empty array is from constant to prevent `useEffect`
  // from firing every time new array is created
  disabled: string[] = emptyArray,
): Api.Session.Submit | null {
  const dispatch = useDispatch<MixedDispatch>()
  const [
    submitResponse,
    setSubmitResponse,
  ] = useState<Api.Session.Submit | null>(null)

  useEffect(() => {
    if (!done) return

    SessionsService.submitAnswers(app, answers, disabled)
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
