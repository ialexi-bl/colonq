import LetterButton from 'components/shared/LetterButton'
import React from 'react'

export type TrigKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | 'frac'
  | 'sqrt'
  | 'left'
  | 'right'
  | 'submit'
  | 'delete'
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
        'w-full max-w-xs flex flex-col justify-around text-5xl mt-auto mx-auto mb-8'
      }
    >
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('0')}
          disabled={!allowed['0']}
          className={'w-16'}
        >
          0
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('1')}
          disabled={!allowed['1']}
          className={'w-16'}
        >
          1
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('2')}
          disabled={!allowed['2']}
          className={'w-16'}
        >
          2
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('3')}
          disabled={!allowed['3']}
          className={'w-16'}
        >
          3
        </LetterButton>
      </div>
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('sqrt')}
          disabled={!allowed.sqrt}
          className={'w-16'}
        >
          &radic;
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('frac')}
          disabled={!allowed.frac}
          className={'w-16'}
        >
          &divide;
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('delete')}
          disabled={!allowed.delete}
          className={'w-16 h-16 text-3xl'}
        >
          ⌫
        </LetterButton>
      </div>
      <div className={'h-20 flex flex-row justify-around items-center'}>
        <LetterButton
          onClick={() => onKeyPress('left')}
          disabled={!allowed.left}
          className={'w-16'}
        >
          🡐
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('right')}
          disabled={!allowed.right}
          className={'w-16'}
        >
          🡒
        </LetterButton>
        <LetterButton
          onClick={() => onKeyPress('submit')}
          disabled={!allowed.submit}
          className={'w-16'}
        >
          ↩
        </LetterButton>
      </div>
    </div>
  )
}
