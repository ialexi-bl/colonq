import { Lesson } from 'store/user'
import { app as appRoute } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { withAuth } from 'components/shared/EnsureAuthenticated'
import DynamicIcon from 'components/icons/DynamicIcon'
import ThemeCard from 'components/shared/ThemeCard'

export type LessonsListProps = {
  lessons: Lesson[]
  app: string
}

function LessonsList({ lessons, app: appName }: LessonsListProps) {
  const dispatch = useDispatch()

  return (
    <div className={'px-4 mt-4 pb-64'}>
      {lessons.map((lesson, i) => {
        const disabled = !lesson.unlocked || lesson.empty
        return (
          <ThemeCard
            variant={((i % 4) + 1) as 1}
            key={lesson.id}
            icon={<DynamicIcon icon={lesson.icon} />}
            title={lesson.title}
            detail={detail(lesson)}
            progress={lesson.score / 100}
            disabled={disabled}
            className={'mb-2'}
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
