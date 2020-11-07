import { AccentWord } from './AccentWord'
import { ApiResponse } from 'services/client/config'
import { PageContainer } from 'components/shared/Page'
import { ProblemsConsumerProps } from 'apps/shared/ProblemsProvider'
import { TwoLatestDisplay } from 'components/apps/TwoLatestDisplay'
import { appsList } from 'config/routes'
import { closeLoading, notifyErrorObject, openLoading } from 'store/view'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import AchievementsDisplay from 'apps/shared/AchievementsDisplay'
import Exit from 'components/icons/Exit'
import Hide from 'components/icons/Hide'
import ProgressBar from 'apps/shared/ProgressBar'
import React, { useEffect, useState } from 'react'
import SessionApi from 'services/api/session'
import useApiClient from 'hooks/use-api-client'
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
  ] = useState<ApiResponse.Session.Submit | null>(testResp)
  const dispatch = useDispatch()
  const { executeAuthorized } = useApiClient()

  useHideNavigation()
  useEffect(() => {
    if (!done) return

    dispatch(openLoading('session'))
    executeAuthorized(
      SessionApi.submitAnswers('russian/accents', answers, disabled),
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

  if (submitResponse) {
    return <AchievementsDisplay response={submitResponse} />
  }

  return (
    <PageContainer className={'flex flex-col h-0'}>
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
    </PageContainer>
  )
}

const testResp = {
  updatedLessons: [
    {
      old: 0,
      new: 70,
      id: '1',
    },
    {
      id: '3',
      old: 2,
      new: 90,
    },
    {
      id: '6',
      old: 80,
      new: 90,
    },
    {
      id: '7',
      old: 5,
      new: 20,
    },
  ],
  unlockedLessons: ['2', '6'],
  lessons: [
    {
      id: '1',
      icon: 'russian/1',
      title: 'Существительные 1',
      score: 70,
      unlocked: true,
    },
    {
      id: '2',
      icon: 'russian/1',
      title: 'Прилагательные 1',
      score: 0,
      unlocked: true,
    },
    {
      id: '3',
      icon: 'russian/1',
      title: 'Глаголы 1',
      score: 0,
      unlocked: false,
    },
    {
      id: '4',
      icon: 'russian/2',
      title: 'Глаголы 2',
      score: 0,
      unlocked: false,
    },
    {
      id: '5',
      icon: 'russian/1',
      title: 'Наречия и деепричастия 1',
      score: 0,
      unlocked: false,
    },
    {
      id: '6',
      icon: 'russian/3',
      title: 'Глаголы 3',
      score: 0,
      unlocked: false,
    },
    {
      id: '7',
      icon: 'russian/1',
      title: 'Причастия 1',
      score: 0,
      unlocked: false,
    },
    {
      id: '8',
      icon: 'russian/2',
      title: 'Причастия 2',
      score: 0,
      unlocked: false,
    },
    {
      id: '9',
      icon: 'russian/2',
      title: 'Существительные 2',
      score: 0,
      unlocked: false,
    },
    {
      id: '10',
      icon: 'russian/2',
      title: 'Наречия и деепричастия 2',
      score: 0,
      unlocked: false,
    },
    {
      id: '11',
      icon: 'russian/4',
      title: 'Глаголы 4',
      score: 0,
      unlocked: false,
    },
    {
      id: '12',
      icon: 'russian/5',
      title: 'Глаголы 5',
      score: 0,
      unlocked: false,
    },
    {
      id: '13',
      icon: 'russian/6',
      title: 'Глаголы 6',
      score: 0,
      unlocked: false,
    },
    {
      id: '14',
      icon: 'russian/7',
      title: 'Глаголы 7',
      score: 0,
      unlocked: false,
    },
    {
      id: '15',
      icon: 'russian/2',
      title: 'Прилагательные 2',
      score: 0,
      unlocked: false,
    },
    {
      id: '16',
      icon: 'russian/3',
      title: 'Существительные 3',
      score: 0,
      unlocked: false,
    },
    {
      id: '17',
      icon: 'russian/3',
      title: 'Причастия 3',
      score: 0,
      unlocked: false,
    },
    {
      id: '18',
      icon: 'russian/8',
      title: 'Глаголы 8',
      score: 0,
      unlocked: false,
    },
    {
      id: '19',
      icon: 'russian/9',
      title: 'Глаголы 9',
      score: 0,
      unlocked: false,
    },
    {
      id: '20',
      icon: 'russian/4',
      title: 'Существительные 4',
      score: 0,
      unlocked: false,
    },
    {
      id: '21',
      icon: 'russian/10',
      title: 'Глаголы 10',
      score: 0,
      unlocked: false,
    },
  ],
}
