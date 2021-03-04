import { Api } from 'core/api/config'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import Bubble from 'components/shared/Bubble'
import Button from 'components/shared/Button'
import Hr from 'components/shared/Hr'
import useIconsSet from 'hooks/use-icons-set'
import useTween from 'hooks/use-tween'

export type AchievementsDisplayProps = {
  response: Api.Session.Submit
  delay?: number
}

export default function AchievementsDisplay({
  response,
  delay = 200,
}: AchievementsDisplayProps) {
  const { updatedStages, unlockedStages } = response
  const hrVariant = useMemo(() => (Math.floor(Math.random() * 2) + 1) as 1, [])
  const history = useHistory()

  return (
    <div className={'w-full h-full flex flex-col justify-center items-center'}>
      <Unlocked unlocked={unlockedStages} delay={delay} />
      {unlockedStages.length > 0 && (
        <Hr className={'w-full'} variant={hrVariant} />
      )}
      <Updated updated={updatedStages} delay={delay} />
      <Button onClick={history.goBack} className={'mt-8 min-w-64'}>
        Продолжить
      </Button>
    </div>
  )
}

type UpdatedProps = {
  // lessons: Record<string, Api.User.LessonDescription>
  updated: { id: string; new: number; icon: string; old: number }[]
  delay: number
}
function Updated({ /* lessons, */ updated, delay }: UpdatedProps) {
  const tween = useTween(updated.length > 0, 1000, delay)
  const Icon = useIconsSet('numbers')

  return (
    <div className={'flex flex-wrap justify-center items-center'}>
      {updated.map((score, i) => {
        return (
          <Figure title={`Часть ${+score.id + 1}`} key={score.id}>
            <Bubble
              variant={((i % 4) + 1) as 1}
              progress={(score.old + (score.new - score.old) * tween) / 100}
              icon={<Icon name={score.icon} />}
            />
          </Figure>
        )
      })}
    </div>
  )
}

type UnlockedProps = {
  // lessons: Record<string, Api.User.LessonDescription>
  unlocked: { icon: string; id: string }[]
  delay: number
}
function Unlocked({ unlocked, delay }: UnlockedProps) {
  const [disabled, setDisabled] = useState(true)
  const Icon = useIconsSet('numbers')

  useEffect(() => {
    if (unlocked.length) {
      const timeout = window.setTimeout(() => setDisabled(false), delay)
      return () => clearTimeout(timeout)
    }
  }, [delay, unlocked.length])

  if (!unlocked.length) return null

  return (
    <div className={'flex flex-wrap justify-center items-center'}>
      {unlocked.map(({ id, icon }, i) => {
        return (
          <Figure title={`Часть ${+id + 1}`} key={id}>
            <Bubble
              unlockTransition
              disabled={disabled}
              variant={((i % 4) + 1) as 1}
              progress={0}
              icon={<Icon name={icon} />}
            />
          </Figure>
        )
      })}
    </div>
  )
}

const Figure = ({
  children,
  title,
}: {
  children?: ReactNode
  title: string
}) => (
  <div className={'flex flex-col items-center mx-1'}>
    <div>{children}</div>
    <div className={'mt-2 w-20 truncate text-center'}>{title}</div>
  </div>
)
