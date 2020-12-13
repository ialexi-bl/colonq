import { TwoLatestDisplay } from 'components/apps/TwoLatestDisplay'
import { useEffect } from 'react'
import ProgressBar from 'apps/shared/ProgressBar'
import SessionControls, { SessionExit } from 'apps/shared/SessionControls'
import SubmitResult from 'apps/shared/SubmitResult'
import TrigAnswer from './TrigAnswer'
import TrigKeyboard, { TrigKey } from './TrigKeyboard'
import TrigView, { TrigProblem } from './TrigView'
import useForceUpdate from 'hooks/use-force-update'
import useHideNavigation from 'hooks/use-hide-navigation'
import useSubmitAnswers from 'apps/hooks/use-submit-answers'
import useTwoLatestProblemControls from 'apps/hooks/use-two-latest-problem-controls'

export type TrigProblemRaw = {
  id: string
  answer: string
  problem: [string, string]
}
export type TrigSessionProps = {
  problems: TrigProblemRaw[]
}

const methodsBindings: Record<string, TrigKey | 'down' | 'up'> = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  '~': '0',
  '`': '0',
  '/': 'frac',
  '.': 'sqrt',
  q: 'sqrt',
  a: 'left',
  d: 'right',
  w: 'up',
  s: 'down',
  enter: 'submit',
  space: 'submit',
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  backspace: 'delete',
  arrowright: 'right',
}
export default function TrigSession({ problems }: TrigSessionProps) {
  const forceUpdate = useForceUpdate()
  const {
    next,
    done,
    current,
    answers,
    previous,
    previous2,
    progress,
  } = useTwoLatestProblemControls<TrigProblem, string>(
    () => problems.map<TrigProblem>((x) => ({ ...x, value: new TrigAnswer() })),
    (x, y) => x.answer === y,
    (x) => ({ ...x, value: new TrigAnswer() }),
  )
  const submitResponse = useSubmitAnswers('math/trigonometry', done, answers)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat || !current) return
      const method = methodsBindings[e.key.toLowerCase()]
      if (method === 'submit') {
        next(current.data.value.toString())
      } else if (method) {
        current.data.value[method]()
        forceUpdate()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, forceUpdate, next])
  useHideNavigation()

  return (
    <div className={'h-full flex flex-col'}>
      <ProgressBar progress={progress} />
      <TwoLatestDisplay
        current={current}
        previous={previous}
        previous2={previous2}
        render={(props) => (
          <TrigView
            correct={props.item.answer === props.item.value.toString()}
            next={next}
            {...props}
          />
        )}
      />
      <TrigKeyboard
        allowed={current?.data.value.allowedKeys()}
        onKeyPress={(key) => {
          if (key === 'submit') {
            if (current) next(current.data.value.toString())
          } else {
            current?.data.value[key]()
            forceUpdate()
          }
        }}
      />
      <SessionControls>
        <SessionExit />
      </SessionControls>
      <SubmitResult response={submitResponse} />
    </div>
  )
}
