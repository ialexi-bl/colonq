import { ReactNode } from 'react'
import { ScrollablePage } from 'components/shared/Page'
import {
  renderScrollThumb,
  renderScrollTrack,
} from 'components/shared/render-scroll'
import Close from 'components/icons/Close'
import Popup from 'components/shared/Popup'
import Scrollbars from 'react-custom-scrollbars'
import SqrtIcon from 'components/icons/Sqrt'
import useOnWindowKeyPress from 'hooks/use-on-window-key-press'

export default function TrigHelp({
  shown,
  close,
}: {
  shown?: boolean
  close: () => void
}) {
  useOnWindowKeyPress('Escape', close)

  return (
    <Popup shown={shown}>
      <button
        className={'absolute top-0 right-0 p-4 w-16 h-16 z-10'}
        onClick={close}
        title={'Закрыть помощь'}
      >
        <Close />
      </button>

      <Scrollbars
        autoHide
        renderThumbVertical={renderScrollThumb}
        renderTrackVertical={renderScrollTrack}
      >
        <div className={'max-w-2xl mx-auto pt-16 px-4 pb-72'}>
          <h2 className={'text-4xl pb-4'}>Помощь</h2>
          <p className={'pb-6'}>
            Используй клавиатуру или кнопки на экране, чтобы ввести ответ на
            задачу. Одно число можно записать разными способами. Например, для
            задачи sin(45°) допустимы ответы{' '}
            <Frac numerator={<Sqrt>2</Sqrt>} denominator={2} />,{' '}
            <Frac numerator={1} denominator={<Sqrt>2</Sqrt>} />,{' '}
            <Frac
              numerator={-3}
              denominator={
                <>
                  -3<Sqrt>2</Sqrt>
                </>
              }
            />{' '}
            и другие. Ответ, у которого в знаменателе 0, воспринимается как
            "Неопределено".
          </p>
          <h3 className={'text-2xl pb-4'}>Список горячих клавиш</h3>
          <ul className={'list-disc pl-6 space-y-4'}>
            <li>
              Клавиши с цифрами: <kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd> и{' '}
              <kbd>3</kbd>. Чтобы ввести ноль можно использовать <kbd>`</kbd>{' '}
              (Русская <kbd>Ё</kbd>).
            </li>
            <li>
              Минус <kbd>-</kbd>
            </li>
            <li>Стрелки для навигации по набранному выражению.</li>
            <li>
              <kbd>W</kbd>, <kbd>/</kbd> &mdash; Разделить.
            </li>
            <li>
              <kbd>Q</kbd>, <kbd>S</kbd>, <kbd>V</kbd>, <kbd>E</kbd>,{' '}
              <kbd>R</kbd>, <kbd>T</kbd>, <kbd>X</kbd>, <kbd>.</kbd> &mdash;
              Квадратный корень.
            </li>
            <li>
              <kbd>Backspace</kbd> &mdash; Стереть символ перед курсором.
            </li>
            <li>
              <kbd>Enter</kbd>, <kbd>Space</kbd> &mdash; Подтвердить.
            </li>
            <li>
              <kbd>U</kbd>, <kbd>\</kbd> &mdash; Неопределено.
            </li>
            <li>
              <kbd>Shift+W</kbd> &mdash; Больше не показывать текущее задание.
              Его можно будет снова включить в настройках.
            </li>
          </ul>
        </div>
      </Scrollbars>
    </Popup>
  )
}

const Sqrt = ({ children }: BasicProps) => (
  <SqrtIcon className={'inline-block w-6 h-6'}>{children}</SqrtIcon>
)
const Frac = ({
  numerator,
  denominator,
}: {
  numerator: ReactNode
  denominator: ReactNode
}) => (
  <span className={'inline-block align-middle text-center'}>
    <span className={'block h-7'}>{numerator}</span>
    <span className={'block bg-white h-px'} />
    <span className={'block h-7'}>{denominator}</span>
  </span>
)
