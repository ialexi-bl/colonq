import React, { memo, useEffect, useState } from 'react'
import SqrtIcon from 'components/icons/Sqrt'
import TrigAnswer, { Expr } from './TrigAnswer'
import cn from 'clsx'

export type TrigExpressionProps = {
  active: boolean
  value: TrigAnswer
}
export default function TrigExpression({ active, value }: TrigExpressionProps) {
  const { fraction, numerator, denominator } = value.toObject()
  return (
    <Fraction
      numerator={numerator}
      denominator={denominator}
      onlyNumerator={!fraction}
      active={active}
    />
  )
}

export function Fraction({
  numerator,
  denominator,
  onlyNumerator = false,
  active = false,
}: {
  numerator: Expr
  denominator: Expr
  onlyNumerator?: boolean
  active?: boolean
}) {
  return (
    <div
      className={cn(
        'text-4xl min-w-6 transform duration-200',
        onlyNumerator ? 'h-12' : 'h-28 mt-4',
      )}
    >
      <Expression active={active} expr={numerator} />
      <div
        className={cn(
          'w-full my-px h-1 bg-light duration-200',
          onlyNumerator && 'opacity-0',
        )}
      />
      <Expression active={active} expr={denominator} />
    </div>
  )
}

function Expression({ expr, active }: { expr: Expr; active?: boolean }) {
  return (
    <div className={'flex items-center justify-center h-12'}>
      {expr.map((x) =>
        x.type === 'sqrt' ? (
          <Sqrt key={x.type} cursor={x.cursor} value={x.value} />
        ) : x.type === 'coef' ? (
          <Value key={x.type} value={x.value} />
        ) : (
          active && <Cursor key={x.type} />
        ),
      )}
    </div>
  )
}
const Sqrt = memo(function Sqrt({
  value,
  cursor,
  active,
}: {
  value: number | string | null
  cursor: 'start' | 'end' | false
  active?: boolean
}) {
  return (
    <SqrtIcon className={'inline-block h-12 text-6xl'}>
      {!active && cursor === 'start' && <Cursor large />}
      <span>{value}</span>
      {!active && cursor === 'end' && <Cursor large />}
    </SqrtIcon>
  )
})
function Value({ value }: { value: string | number }) {
  return <span>{value}</span>
}
function Cursor({ large }: { large?: boolean }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const inteval = window.setInterval(() => setVisible((v) => !v), 1000)
    return () => clearInterval(inteval)
  }, [])

  return (
    <span
      style={{ width: large ? 4 : 2 }}
      className={cn(
        'inline-block align-middle bg-light',
        large ? 'h-12' : 'h-6',
        !visible && 'invisible',
      )}
    />
  )
}
