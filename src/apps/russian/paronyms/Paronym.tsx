// @ts-nocheck
// eslint-disable
import { TwoLatestDisplayViewProps } from 'components/apps/TwoLatestDisplay'
import Input from 'components/form/Input'
import React, { memo, useMemo, useState } from 'react'
import styles from './Paronym.module.scss'

export type AccentWordProps = {
  word: [number, string]
  onLetterClick: (i: number) => unknown
  answer: undefined | number
}

export const Paronym = memo(function Paronym({
  item: word,
  active,
  next,
}: TwoLatestDisplayViewProps<Word>) {
  const [value, setValue] = useState('')
  const [start, helper, end, correct] = useMemo(() => {
    const [, start, content, end] = word.label.match(/^([^[]*)\[(.+?)\](.*)/)!

    const options = content.split('|')
    const placeholder = random(options)
    const correct = options.find((x) => x !== x.toLowerCase()) || ''
    return [start, placeholder, end, correct]
  }, [word.label])

  return (
    <div className={styles.Word}>
      {start}
      <Input
        size={Math.max(helper.length, correct.length) + 4}
        value={active ? value : correct}
        state={active ? undefined : isCorrect ? 'valid' : 'invalid'}
        tabIndex={active ? 0 : -1}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          next()
        }}
        ref={(e) => {
          if (e && active && isInput(document.activeElement)) {
            e.focus()
          }
        }}
      />
      {end}
    </div>
  )
})

const isInput = (e: Element | null) => e?.tagName.toLowerCase() === 'input'
const random = <T extends any>(arr: T[]) => arr[~~(Math.random() * arr.length)]
