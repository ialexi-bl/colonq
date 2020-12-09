import { ApiResponse } from 'services/api/config'
import { useHistory } from 'react-router'
import Bubble from 'components/shared/Bubble'
import Button from 'components/shared/Button'
import DynamicIcon, { preloadIcons } from 'components/icons/DynamicIcon'
import FullscreenLoading from 'components/shared/GlobalLoading/FullscreenLoading'
import Hr from 'components/shared/Hr'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import useTween from 'hooks/use-tween'

export type AchievementsDisplayProps = {
  response: ApiResponse.Session.Submit
  delay?: number
}

export default function AchievementsDisplay({
  response,
  delay = 200,
}: AchievementsDisplayProps) {
  const { lessons, updatedLessons, unlockedLessons } = response
  const hrVariant = useMemo(() => (Math.floor(Math.random() * 2) + 1) as 1, [])
  const history = useHistory()
  const [loaded, setLoaded] = useState(false)

  const lessonsObj = useMemo(() => {
    const res: Record<string, ApiResponse.User.LessonDescription> = {}
    lessons.forEach((lesson) => {
      res[lesson.id] = lesson
    })
    return res
  }, [lessons])

  useEffect(() => {
    const icons: Record<string, true> = {}
    updatedLessons.forEach(({ id }) => (icons[lessonsObj[id].icon] = true))
    unlockedLessons.forEach((id) => (icons[lessonsObj[id].icon] = true))

    preloadIcons(Object.keys(icons)).then(() => {
      setLoaded(true)
    })
    // Loading icons only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={'w-full h-full flex flex-col justify-center items-center'}>
      <FullscreenLoading visible={!loaded} absolute />
      {loaded && (
        <>
          <Unlocked
            lessons={lessonsObj}
            unlocked={unlockedLessons}
            delay={delay}
          />
          {unlockedLessons.length > 0 && (
            <Hr className={'w-full'} variant={hrVariant} />
          )}
          <Updated
            lessons={lessonsObj}
            updated={updatedLessons}
            delay={delay}
          />
          <Button onClick={history.goBack} className={'mt-8 min-w-64'}>
            Продолжить
          </Button>
        </>
      )}
    </div>
  )
}

type UpdatedProps = {
  lessons: Record<string, ApiResponse.User.LessonDescription>
  updated: { id: string; new: number; old: number }[]
  delay: number
}
function Updated({ lessons, updated, delay }: UpdatedProps) {
  const tween = useTween(updated.length > 0, 1000, delay)

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
              icon={<DynamicIcon icon={lessons[score.id].icon} />}
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
  delay: number
}
function Unlocked({ lessons, unlocked, delay }: UnlockedProps) {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (unlocked.length) {
      const timeout = window.setTimeout(() => setDisabled(false), delay)
      return () => clearTimeout(timeout)
    }
  }, [delay, unlocked.length])

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
              icon={<DynamicIcon icon={lessons[id].icon} />}
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
