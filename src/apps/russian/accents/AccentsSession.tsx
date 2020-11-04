import LessonSuspense from 'apps/shared/LessonSuspense'
import React from 'react'
import useLesson, { PRACTICE } from 'apps/hooks/use-lesson'

type Problem = {
  problem: string
  answer: string
}

export type AccentsSessionProps = {
  lesson: string | typeof PRACTICE
}
export default function AccentsSession({
  lesson: lessonName,
}: AccentsSessionProps) {
  const lesson = useLesson<Problem>('accents/russian', lessonName)
  if (lesson.status !== 'loaded') {
    return <LessonSuspense status={lesson.status} app={'russian/accents'} />
  }

  const { problems } = lesson
  return <div>Hello</div>
}
