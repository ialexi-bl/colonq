import { TwoLatestDisplay } from 'components/shared/TwoLatestDisplay'
import { useEffect } from 'react'
import ProgressBar from 'apps/shared/ProgressBar'
import SessionControls, {
  SessionExit,
  SessionHelp,
  SessionHide,
} from 'apps/shared/SessionControls'
import SubmitResult from 'apps/shared/SubmitResult'
import TrigAnswer from './TrigAnswer'
import TrigHelp from './TrigHelp'
import TrigKeyboard, { TrigKey } from './TrigKeyboard'
import TrigView, { TrigProblem } from './TrigView'
import isKeyboardConnected from 'util/keyboard-connected'
import useForceUpdate from 'hooks/use-force-update'
import useHideNavigation from 'hooks/use-hide-navigation'
import useSubmitAnswers from 'apps/hooks/use-submit-answers'
import useToggle from 'hooks/use-toggle'
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
  Digit0: '0',
  Digit1: '1',
  Digit2: '2',
  Digit3: '3',
  KeyQ: 'sqrt',
  KeyS: 'sqrt',
  KeyV: 'sqrt',
  KeyE: 'sqrt',
  KeyT: 'sqrt',
  KeyR: 'sqrt',
  KeyX: 'sqrt',
  KeyW: 'frac',
  KeyU: 'undefined',
  Minus: 'minus',
  Enter: 'submit',
  Space: 'submit',
  Slash: 'frac',
  Period: 'sqrt',
  ArrowUp: 'up',
  Backquote: '0',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Backspace: 'delete',
  Backslash: 'undefined',
  ArrowRight: 'right',
}
export default function TrigSession({ problems }: TrigSessionProps) {
  const forceUpdate = useForceUpdate()
  const [helpShown, toggleHelp] = useToggle(false)
  const {
    next,
    done,
    hide,
    current,
    answers,
    progress,
    previous,
    previous2,
  } = useTwoLatestProblemControls<TrigProblem, string>(
    () => problems.map<TrigProblem>((x) => ({ ...x, value: new TrigAnswer() })),
    (x, y) => x.answer === y,
    (x) => ({ ...x, value: new TrigAnswer() }),
  )
  const submitResponse = useSubmitAnswers('math/trigonometry', done, answers)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        !(e.code in methodsBindings) ||
        e.repeat ||
        // Combinations that include control keys are ignored
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        !current
      ) {
        return
      }
      const method = methodsBindings[e.code]

      if (method === 'submit') {
        if (current.data.value.allowedKeys().submit) {
          next(current.data.value.toString())
        }
      } else if (method === 'undefined') {
        if (current)
          current.data.value = TrigAnswer.fromString(TrigAnswer.UNDEFINED)
        next(TrigAnswer.UNDEFINED)
      } else {
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
          } else if (key === 'undefined') {
            if (current)
              current.data.value = TrigAnswer.fromString(TrigAnswer.UNDEFINED)
            next(TrigAnswer.UNDEFINED)
          } else {
            current?.data.value[key]()
            forceUpdate()
          }
        }}
      />
      <SessionControls>
        <SessionExit />
        <SessionHide hide={hide} />
        {isKeyboardConnected() && <SessionHelp onClick={toggleHelp} />}
      </SessionControls>

      {isKeyboardConnected() && (
        <TrigHelp close={toggleHelp} shown={helpShown} />
      )}
      <SubmitResult response={submitResponse} />
    </div>
  )
}
