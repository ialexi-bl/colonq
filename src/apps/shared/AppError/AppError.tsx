import Page from 'components/shared/Page'
import React from 'react'

export type AppErrorProps = {
  id: string
  type?: 'no-problems' | 'locked' | 'unknown'
}

const messages: Record<Extract<AppErrorProps['type'], string>, string> = {
  'no-problems':
    'Нет доступных заданий. Возможно, все задания этого урока выключены, и их можно включить в настройках приложения',
  locked:
    'Этот урок пока заблокирован. Заверши предыдущие уроки, чтобы разблокировать его',
  unknown: 'Нет удалось загрузить приложение, попробуй ещё раз позже',
}
// TODO: style
export default function AppError({ type = 'unknown' }: AppErrorProps) {
  return (
    <Page>
      <div>{messages[type]}</div>
    </Page>
  )
}
