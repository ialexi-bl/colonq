import Back from 'components/icons/Back'
import Backspace from 'components/icons/Backspace'
import Continue from 'components/icons/Continue'
import Done from 'components/icons/Done'
import LetterButton from 'components/shared/LetterButton'
import NotExists from 'components/icons/NotExists'
import cn from 'clsx'
import styles from './Trigonometry.module.scss'

export type TrigKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | 'frac'
  | 'sqrt'
  | 'left'
  | 'right'
  | 'minus'
  | 'submit'
  | 'delete'
  | 'undefined'
export type TrigActiveKeys = Partial<Record<TrigKey, boolean>>
export type TrigKeyboardProps = {
  onKeyPress: (key: TrigKey) => unknown
  allowed?: TrigActiveKeys
}

export default function TrigKeyboard({
  onKeyPress,
  allowed = {},
}: TrigKeyboardProps) {
  return (
    <div
      className={
        'w-full max-w-xs flex flex-col justify-around text-5xl ' +
        'mt-auto mx-auto mb-8 font-display'
      }
    >
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('0')}
          disabled={!allowed['0']}
          className={cn('w-16', styles.TrigBtn, styles.TrigZero)}
          title={'0'}
        >
          0
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('1')}
          disabled={!allowed['1']}
          className={'w-16'}
          title={'1'}
        >
          1
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('2')}
          disabled={!allowed['2']}
          className={'w-16'}
          title={'2'}
        >
          2
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('3')}
          disabled={!allowed['3']}
          className={'w-16'}
          title={'3'}
        >
          3
        </LetterButton>
      </div>
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('minus')}
          disabled={!allowed.minus}
          className={'w-16'}
          title={'Минус'}
        >
          -
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('sqrt')}
          disabled={!allowed.sqrt}
          className={cn(styles.TrigBtn, styles.TrigSqrt, 'w-16')}
          title={'Корень'}
        >
          &radic;
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('frac')}
          disabled={!allowed.frac}
          className={cn(styles.TrigBtn, styles.TrigFrac, 'w-16 pt-1 pb-3')}
          title={'Разделить'}
        >
          &divide;
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('delete')}
          disabled={!allowed.delete}
          title={'Стереть'}
          className={'w-16 h-16 text-3xl'}
        >
          <Backspace />
        </LetterButton>
      </div>
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('left')}
          disabled={!allowed.left}
          className={'w-16 h-16'}
          title={'Влево'}
        >
          <Back />
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('right')}
          disabled={!allowed.right}
          className={'w-16 h-16'}
          title={'Вправо'}
        >
          <Continue />
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('undefined')}
          disabled={!allowed.undefined}
          className={'w-16 h-16'}
          title={'Неопределено'}
        >
          <NotExists />
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('submit')}
          disabled={!allowed.submit}
          className={'w-16 h-16'}
          title={'Подтвердить'}
        >
          <Done />
        </LetterButton>
      </div>
    </div>
  )
}
