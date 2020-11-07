import { ApiResponse } from 'services/client/config'
import { closeLoading, openLoading } from 'store/view'
import { preloadIcons } from 'components/icons/DynamicIcon'
import { useDispatch } from 'react-redux'
import Accents from 'components/icons/dynamic/russian/accents'
import Bubble from 'components/shared/Bubble'
import Hr from 'components/shared/Hr'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import useTween from 'hooks/use-tween'

export type AchievementsDisplayProps = {
  response: ApiResponse.Session.Submit
}

export default function AchievementsDisplay({
  response,
}: AchievementsDisplayProps) {
  const { lessons, updatedLessons, unlockedLessons } = response
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  const lessonsObj = useMemo(() => {
    const res: Record<string, ApiResponse.User.LessonDescription> = {}
    lessons.forEach((lesson) => {
      res[lesson.id] = lesson
    })
    return res
  }, [lessons])

  useEffect(() => {
    dispatch(openLoading('achievements-display'))
    const icons: Record<string, true> = {}
    updatedLessons.forEach(({ id }) => (icons[lessonsObj[id].icon] = true))
    unlockedLessons.forEach((id) => (icons[lessonsObj[id].icon] = true))

    preloadIcons(Object.keys(icons)).then(() => {
      dispatch(closeLoading('achievements-display'))
      setLoaded(true)
    })
    // Loading icons only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loaded) return

  return (
    <div className={'w-full h-full flex flex-col justify-center'}>
      <Updated lessons={lessonsObj} updated={updatedLessons} />
      {unlockedLessons.length > 0 && <Hr />}
      <Unlocked lessons={lessonsObj} unlocked={unlockedLessons} />
    </div>
  )
}

type UpdatedProps = {
  lessons: Record<string, ApiResponse.User.LessonDescription>
  updated: { id: string; new: number; old: number }[]
}
function Updated({ lessons, updated }: UpdatedProps) {
  const tween = useTween(updated.length > 0, 1000, 200)
  return (
    <div className={'flex flex-wrap justify-center items-center'}>
      {updated.map((score, i) => {
        if (!(score.id in lessons)) {
          console.warn(`No description for updated lesson ${score.id}`)
          return null
        }

        return (
          <Figure key={score.id} title={lessons[score.id].title}>
            <Bubble
              variant={((i % 4) + 1) as 1}
              progress={(score.old + (score.new - score.old) * tween) / 100}
              icon={<Accents />}
            />
          </Figure>
        )
      })}
    </div>
  )
}

type UnlockedProps = {
  lessons: Record<string, ApiResponse.User.LessonDescription>
  unlocked: string[]
}
function Unlocked({ lessons, unlocked }: UnlockedProps) {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (unlocked.length) setTimeout(() => setDisabled(false), 10)
  }, [unlocked.length])

  if (!unlocked.length) return null

  return (
    <div className={'flex flex-wrap justify-center items-center'}>
      {unlocked.map((id, i) => {
        if (!(id in lessons)) {
          console.warn(`No description for unlocked lesson ${id}`)
          return null
        }

        return (
          <Figure key={id} title={lessons[id].title}>
            <Bubble
              unlockTransition
              disabled={disabled}
              variant={((i % 4) + 1) as 1}
              progress={0}
              icon={<Accents />}
            />
          </Figure>
        )
      })}
    </div>
  )
}

const Figure = ({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) => (
  <div className={'flex flex-col items-center mx-1'}>
    <div>{children}</div>
    <div className={'mt-2 w-20 truncate'}>{title}</div>
  </div>
)
