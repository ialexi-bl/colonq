import { Lesson } from 'store/user'
import { app as appRoute } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { withAuth } from 'components/shared/EnsureAuthenticated'
import ThemeCard from 'components/shared/ThemeCard'
import useIconsSet from 'hooks/use-icons-set'

export type LessonsListProps = {
  iconsSet: string
  lessons: Lesson[]
  app: string
}

function LessonsList({ lessons, iconsSet, app: appName }: LessonsListProps) {
  const dispatch = useDispatch()
  const Icon = useIconsSet(iconsSet)

  return (
    <div className={'px-4 mt-4 pb-64'}>
      {lessons.map((lesson, i) => {
        const disabled = !lesson.unlocked || lesson.empty
        return (
          <ThemeCard
            variant={((i % 4) + 1) as 1}
            key={lesson.id}
            icon={<Icon name={lesson.icon} />}
            title={lesson.title}
            detail={detail(lesson)}
            progress={lesson.score / 100}
            disabled={disabled}
            className={'mb-2 cursor-pointer'}
            onClick={() =>
              !disabled &&
              dispatch(
                push(appRoute(appName, `lesson/${lesson.id}`), {
                  redirect: appRoute(appName, 'stats'),
                }),
              )
            }
          />
        )
      })}
    </div>
  )
}
const detail = (lesson: Lesson) =>
  lesson.empty ? 'Нет заданий' : !lesson.unlocked ? 'Заблокировано' : ''

export default withAuth(LessonsList)
