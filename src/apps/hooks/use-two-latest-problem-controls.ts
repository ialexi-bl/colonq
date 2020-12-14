import { TwoLatestDisplayItem } from 'components/shared/TwoLatestDisplay'
import { useState } from 'react'

export type Verify<TProblem, TAnswer> = (
  problem: TProblem,
  answer: TAnswer,
) => boolean

/**
 * Provides controls for two latest display: manages
 * the order of items and functions to hide them and
 * submit answers
 * @param _problems - Initial set of problems from server (or a function that returns one)
 * @param verify - Function that receives a problem and an answer and verifies if it's correct
 * @param repeat - Function that gets a failed problem and creates its copy that will be shown to the user later
 */
export default function useTwoLatestProblemControls<
  TProblem extends { id: string },
  TAnswer
>(
  _problems: TProblem[] | (() => TProblem[]),
  verify: Verify<TProblem, TAnswer>,
  repeat: (problem: TProblem) => TProblem = (x) => x,
) {
  // p for pointer
  const [problems, setProblems] = useState<TwoLatestDisplayItem<TProblem>[]>(
    () =>
      (typeof _problems === 'function' ? _problems() : _problems).map(
        (problem, i) => ({
          id: `${problem.id}-${i}`,
          data: problem,
        }),
      ),
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
    editProblem: (value: TProblem | ((current: TProblem) => TProblem)) => {
      setProblems((problems) => {
        const newProblems = [...problems]
        newProblems[p].data =
          typeof value === 'function' ? value(newProblems[p].data) : value
        return newProblems
      })
    },
    next: (answer: TAnswer) => {
      console.log(answer)
      if (!verify(problems[p].data, answer)) {
        // Repeat problem and reduce progress on wrong answer
        setProgress((progress) => Math.max(0, progress - 0.03))
        setProblems((problems) => {
          return problems.concat({
            hiding: problems[p].hiding,
            data: repeat(problems[p].data),
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
