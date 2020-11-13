import { AccentWord } from './AccentWord'
import { ApiResponse } from 'services/client/config'
import { Elevation } from 'config/view'
import { MixedDispatch } from 'store/types'
import { ProblemsConsumerProps } from 'apps/shared/ProblemsProvider'
import { TwoLatestDisplay } from 'components/apps/TwoLatestDisplay'
import { appsList } from 'config/routes'
import { closeLoading, notifyErrorObject, openLoading } from 'store/view'
import { executeAuthorizedMethod } from 'store/user'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import AchievementsDisplay from 'apps/shared/AchievementsDisplay'
import Exit from 'components/icons/Exit'
import Hide from 'components/icons/Hide'
import Page from 'components/shared/Page'
import ProgressBar from 'apps/shared/ProgressBar'
import React, { useEffect, useState } from 'react'
import SessionApi from 'services/api/session'
import cn from 'clsx'
import useElevation from 'hooks/use-elevation'
import useHideNavigation from 'hooks/use-hide-navigation'
import useTwoLatestProblemControls from 'apps/hooks/use-two-latest-problem-controls'

export type AccentsProblem = {
  problem: string
  answer: number
  id: string
}

const verify = (problem: AccentsProblem, answer: number) =>
  problem.answer === answer

export default function AccentsSession({
  problems,
}: ProblemsConsumerProps<AccentsProblem>) {
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
  } = useTwoLatestProblemControls<AccentsProblem, number>(problems, verify)
  const [
    submitResponse,
    setSubmitResponse,
  ] = useState<ApiResponse.Session.Submit | null>(null)
  const dispatch = useDispatch<MixedDispatch>()

  useElevation(Elevation.session)
  useHideNavigation()

  useEffect(() => {
    if (!done) return

    dispatch(openLoading('session'))
    dispatch(
      executeAuthorizedMethod(
        SessionApi.submitAnswers('russian/accents', answers, disabled),
      ),
    )
      .then((response) => {
        setSubmitResponse(response.data)
      })
      .catch((e) => {
        dispatch(notifyErrorObject(e))
        dispatch(push(appsList()))
      })
      .then(() => {
        dispatch(closeLoading('session'))
      })
  }, [answers, disabled, dispatch, done, executeAuthorized])

  return (
    <Page
      routeElevation={Elevation.session}
      className={'flex flex-col overflow-hidden h-0 route-overlay'}
    >
      <ProgressBar progress={progress} />
      <div className={'flex-1'}>
        <TwoLatestDisplay
          next={next}
          current={current}
          previous={previous}
          previous2={previous2}
          component={AccentWord}
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
          'route-exit-translate-y',
          !submitResponse && 'translate-y-full',
        )}
      >
        {submitResponse && (
          <AchievementsDisplay delay={500} response={submitResponse} />
        )}
      </div>
    </Page>
  )
}
