import { ApiResponse } from 'services/api/config'
import { MixedDispatch } from 'store/types'
import { ProblemWithAnswer, WordsNext } from './types'
import { RouteComponentProps, appsList } from 'config/routes'
import {
  TwoLatestDisplay,
  TwoLatestDisplayViewProps,
} from 'components/apps/TwoLatestDisplay'
import { executeAuthorizedMethod, updateLessons } from 'store/user'
import { notifyErrorObject } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import AchievementsDisplay from 'apps/shared/AchievementsDisplay'
import Exit from 'components/icons/Exit'
import Hide from 'components/icons/Hide'
import ProgressBar from 'apps/shared/ProgressBar'
import React, { ComponentType, useEffect, useState } from 'react'
import SessionApi from 'services/api/session'
import cn from 'clsx'
import useHideNavigation from 'hooks/use-hide-navigation'
import useTwoLatestProblemControls from 'apps/hooks/use-two-latest-problem-controls'

export type AccentsSessionProps<
  TProblem extends ProblemWithAnswer
> = RouteComponentProps & {
  wordView: ComponentType<TwoLatestDisplayViewProps<TProblem, WordsNext>>
  problems: TProblem[]
  app: string
}

const verify = (problem: ProblemWithAnswer, answer: number | string) => {
  return problem.answer === answer
}

export default function WordsSession<TProblem extends ProblemWithAnswer>({
  app,
  visible,
  problems,
  wordView: Word,
}: AccentsSessionProps<TProblem>) {
  const {
    next,
    hide,
    done,
    current,
    answers,
    disabled,
    progress,
    previous,
    previous2,
  } = useTwoLatestProblemControls<TProblem, number | string>(problems, verify)
  const [
    submitResponse,
    setSubmitResponse,
  ] = useState<ApiResponse.Session.Submit | null>(null)
  const dispatch = useDispatch<MixedDispatch>()

  useHideNavigation()
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

  if (!visible) return null
  return (
    // useElevation is called in wrapping component
    <div className={'flex flex-col overflow-hidden h-full'}>
      <ProgressBar progress={progress} />
      <div className={'flex-1'}>
        <TwoLatestDisplay<TProblem, WordsNext>
          next={next}
          current={current}
          previous={previous}
          previous2={previous2}
          component={Word}
        />
      </div>
      <div className={'flex px-2 pb-4'}>
        <Exit
          className={'opacity-25 w-12 h-12 mr-4'}
          onClick={() => dispatch(push(appsList()))}
        />
        <Hide className={'opacity-25 w-12 h-12'} onClick={hide} />
      </div>
      <div
        className={cn(
          'absolute inset-0 duration-500 transform bg-secondary-900',
          !submitResponse && 'translate-y-full',
        )}
      >
        {submitResponse && (
          <AchievementsDisplay delay={500} response={submitResponse} />
        )}
      </div>
    </div>
  )
}
