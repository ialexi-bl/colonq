import * as React from 'react'
import Bubble from '../Bubble'
import cn from 'clsx'

export type ThemeCardProps = HTMLProps.div & {
  onIconClick?: React.MouseEventHandler<HTMLDivElement>
  onTextClick?: React.MouseEventHandler<HTMLHeadingElement>
  progress?: number
  disabled?: boolean
  variant?: 1 | 2 | 3 | 4
  detail?: string
  title: string
  icon: React.ReactNode
}

export default function ThemeCard({
  icon,
  title,
  detail,
  disabled,
  className,
  variant = 1,
  progress = 1,
  onTextClick,
  onIconClick,
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
      {detail ? (
        <div className={'flex-1 flex flex-col align-center'}>
          <Title className={'mb-2'} onClick={onTextClick} disabled={disabled}>
            {title}
          </Title>
          <p
            className={cn(
              'text-center uppercase text-sm',
              disabled && 'text-disabled-100',
            )}
          >
            {detail}
          </p>
        </div>
      ) : (
        <Title className={'flex-1'} onClick={onTextClick} disabled={disabled}>
          {title}
        </Title>
      )}
    </div>
  )
}

const Title = ({
  children,
  disabled,
  className,
  ...props
}: { disabled?: boolean } & HTMLProps.heading) => (
  <h3
    className={cn(
      className,
      'ml-2 text-center text-2xl duration-100',
      disabled && 'text-disabled-100',
    )}
    {...props}
  >
    {children}
  </h3>
)
