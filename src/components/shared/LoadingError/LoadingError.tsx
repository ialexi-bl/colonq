import React from 'react'
import cn from 'clsx'

export type LoadingErrorProps = {
  title: string
  detail?: string
  actions?: React.ReactNode
  className?: string
}
export default function LoadingError({
  title,
  detail,
  actions,
  className,
}: LoadingErrorProps) {
  return (
    <div
      className={cn(
        className,
        'px-8 pb-32 h-full flex flex-col items-center justify-center bg-page',
      )}
    >
      <h2 className={`text-2xl text-center ${detail ? 'pb-2' : 'pb-4'}`}>
        {title}
      </h2>
      {detail && <p className={'text-center pb-4'}>{detail}</p>}
      {actions}
    </div>
  )
}
