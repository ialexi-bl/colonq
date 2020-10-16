import Bubble from '../Bubble'
import React from 'react'
import cn from 'clsx'

export type ThemeCardProps = {
  progress?: number
  variant?: 1 | 2 | 3 | 4
  title: string
  icon: React.ReactNode
}

export default function ThemeCard({
  icon,
  title,
  variant = 1,
  progress = 1,
}: ThemeCardProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        variant % 2 === 0 && 'flex-row-reverse',
      )}
    >
      <Bubble icon={icon} progress={progress} variant={variant} />
      <h3 className={'flex-1 text-center text-2xl'}>{title}</h3>
    </div>
  )
}
