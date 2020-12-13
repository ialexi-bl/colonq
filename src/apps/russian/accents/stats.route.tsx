import { RouteComponentProps } from 'config/routes'
import WordsLessonsList from 'apps/shared/words/LessonsList/WordsLessonsList'

export default function ListRoute(controls: RouteComponentProps) {
  return (
    <WordsLessonsList
      app={'russian/accents'}
      title={'Ударения'}
      {...controls}
    />
  )
}
