import { TwoLatestDisplayItem } from 'components/apps/TwoLatestDisplay'
import { useCallback, useState } from 'react'

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
      _problems.map((problem) => ({
        id: problem.id,
        data: problem,
      })),
  )
  const [progress, setProgress] = useState(0)
  const [disabled, setDisabled] = useState<string[]>([])
  const [answers, setAnswers] = useState<{ id: string; answer: TAnswer }[]>([])
  const [p, setPointer] = useState(0)

  return {
    answers,
    progress,
    disabled,
    done: !(p in problems),
    current: p in problems ? problems[p] : null,
    previous: p - 1 in problems ? problems[p - 1] : null,
    previous2: p - 2 in problems ? problems[p - 2] : null,
    next: useCallback(
      (answer: TAnswer) => {
        if (!verify(problems[p].data, answer)) {
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
          setProgress((progress) => {
            return progress + (1 - progress) / (problems.length - p)
          })
        }
        setAnswers((answers) =>
          answers.concat({
            id: problems[p].data.id,
            answer,
          }),
        )
        setPointer((p) => p + 1)
      },
      [p, problems, verify],
    ),
    hide: useCallback(() => {
      setProblems((problems) => {
        problems[p].hiding = true

        // TODO: maybe handle this better than just dismissing problems
        return problems.filter((x, i) => i <= p || x.id !== problems[p].id)
      })
      setDisabled((disabled) => disabled.concat(problems[p].data.id))
      setPointer((p) => p + 1)
    }, [p, problems]),
  }
}
