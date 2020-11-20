import { TwoLatestDisplayItem } from 'components/apps/TwoLatestDisplay'
import { useState } from 'react'

export type Verify<TProblem, TAnswer> = (
  problem: TProblem,
  answer: TAnswer,
) => boolean

export default function useTwoLatestProblemControls<
  TProblem extends { id: string },
  TAnswer
>(_problems: TProblem[], verify: Verify<TProblem, TAnswer>) {
  // p for pointer
  const [problems, setProblems] = useState<TwoLatestDisplayItem<TProblem>[]>(
    () =>
      _problems.map((problem, i) => ({
        id: `${problem.id}-${i}`,
        data: problem,
      })),
  )
  const [progress, setProgress] = useState(0)
  const [disabled, setDisabled] = useState<string[]>([])
  const [answers, setAnswers] = useState<{ id: string; answer: TAnswer }[]>([])
  const [p, setPointer] = useState(0)

  const done = !(p in problems)
  return {
    done,
    answers,
    progress,
    disabled,
    // If done, show previous set of problems so that screen stays the same and doesn't
    // show unneeded empty space where the next word should be, that's what
    // "- +done" is for
    current: p - +done in problems ? problems[p - +done] : null,
    previous: p - 1 - +done in problems ? problems[p - 1 - +done] : null,
    previous2: p - 2 - +done in problems ? problems[p - 2 - +done] : null,
    next: (answer: TAnswer) => {
      if (!verify(problems[p].data, answer)) {
        // Repeat problem and reduce progress on wrong answer
        setProgress((progress) => Math.max(0, progress - 0.03))
        setProblems((problems) => {
          return problems.concat({
            ...problems[p],
            // Changing ID prevents TwoLatestDisplay from showing the same
            // problems twice if the problem is repeated
            id: `${problems[p].data.id}-${problems.length}`,
          })
        })
      } else {
        // Increase progress on correct answer
        setProgress((progress) => {
          return progress + (1 - progress) / (problems.length - p)
        })
      }
      console.log(problems)
      setAnswers((answers) =>
        answers.concat({
          id: problems[p].data.id,
          answer,
        }),
      )
      setPointer((p) => p + 1)
    },
    hide: () => {
      setProblems((problems) => {
        problems[p].hiding = true

        let count = 1
        const newProblems = problems.filter((x, i) => {
          if (i > p && x.data.id === problems[p].data.id) {
            count++
            return false
          }
          return true
        })
        setProgress((progress) => {
          return progress + ((1 - progress) * count) / (problems.length - p)
        })
        return newProblems
      })
      setDisabled((disabled) => disabled.concat(problems[p].data.id))
      setPointer((p) => p + 1)
    },
  }
}
