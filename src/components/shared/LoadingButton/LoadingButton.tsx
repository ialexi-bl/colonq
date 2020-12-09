import Button, { ButtonProps } from '../Button'
import Loading from '../Loading'
import React from 'react'
import cn from 'clsx'

export type LoadingButtonProps = ButtonProps & {
  containerClassName?: string
  loading?: boolean
}

export default function LoadingButton({
  containerClassName,
  className,
  disabled,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <div className={cn(containerClassName, 'flex items-center')}>
      {/* A placeholder that helps position button 
              in the center and loading on the left */}
      <div className={'w-12 max-w-sm ml-auto'} />
      <Button
        className={cn(className, 'text-center min-w-64')}
        disabled={loading || disabled}
        {...props}
      />
      <Loading
        className={cn(
          'h-8 w-8 ml-4 inline-block mr-auto duration-100',
          loading ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
