import Bubble from '../Bubble'
import React from 'react'
import cn from 'clsx'

export type ThemeCardProps = HTMLProps.div & {
  onIconClick?: React.MouseEventHandler<HTMLDivElement>
  onTextClick?: React.MouseEventHandler<HTMLHeadingElement>
  progress?: number
  disabled?: boolean
  variant?: 1 | 2 | 3 | 4
  title: string
  icon: React.ReactNode
}

export default function ThemeCard({
  icon,
  title,
  disabled,
  className,
  variant = 1,
  progress = 1,
  onIconClick,
  onTextClick,
  ...props
}: ThemeCardProps) {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      <Bubble
        onClick={onIconClick}
        disabled={disabled}
        progress={progress}
        variant={variant}
        icon={icon}
      />
      <h3
        onClick={onTextClick}
        className={cn(
          'ml-2 flex-1 text-center text-2xl duration-100',
          disabled && 'text-disabled-100',
        )}
      >
        {title}
      </h3>
    </div>
  )
}
