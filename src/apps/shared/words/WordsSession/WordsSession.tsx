import { ComponentType } from 'react'
import { ProblemWithAnswer } from 'apps/shared/SessionPage'
import {
  TwoLatestDisplay,
  TwoLatestDisplayViewProps,
} from 'components/shared/TwoLatestDisplay'
import ProgressBar from 'apps/shared/ProgressBar'
import SessionControls, {
  SessionExit,
  SessionHide,
} from 'apps/shared/SessionControls'
import SubmitResult from 'apps/shared/SubmitResult'
import useHideNavigation from 'hooks/use-hide-navigation'
import useSubmitAnswers from 'apps/hooks/use-submit-answers'
import useTwoLatestProblemControls from 'apps/hooks/use-two-latest-problem-controls'

export type WordsNext<T extends number | string = number | string> = (
  answer: T,
) => void

export type AccentsSessionProps<TProblem extends ProblemWithAnswer> = {
  wordView: ComponentType<
    TwoLatestDisplayViewProps<TProblem> & {
      next: (answer: string | number) => void
    }
  >
  problems: TProblem[]
  app: string
}

const verify = (problem: ProblemWithAnswer, answer: number | string) => {
  return problem.answer === answer
}

export default function WordsSession<TProblem extends ProblemWithAnswer>({
  app,
  problems,
  wordView: Word,
}: AccentsSessionProps<TProblem>) {
  const {
    next,
    hide,
    done,
    current,
    answers,
    disabled,
    progress,
    previous,
    previous2,
  } = useTwoLatestProblemControls<TProblem, number | string>(problems, verify)
  const submitResponse = useSubmitAnswers(app, done, answers, disabled)

  useHideNavigation()

  return (
    // useElevation is called in wrapping component
    <div className={'flex flex-col overflow-hidden h-full'}>
      <ProgressBar progress={progress} />
      <div className={'flex-1'}>
        <TwoLatestDisplay<TProblem>
          current={current}
          previous={previous}
          previous2={previous2}
          render={(props) => <Word {...props} next={next} />}
        />
      </div>
      <SessionControls>
        <SessionExit />
        <SessionHide hide={hide} />
      </SessionControls>
      <SubmitResult response={submitResponse} />
    </div>
  )
}
