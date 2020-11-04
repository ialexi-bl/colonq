import React from 'react'
import cn from 'clsx'
import shapes from './TextContainer.shape.svg'
import styles from './TextContainer.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type TextContainerProps = HTMLProps.div & {
  variant?: 1 | 2 | 3
}
export default function TextContainer({
  className,
  variant = 1,
  ...props
}: TextContainerProps) {
  useClipShape('text-container', shapes)

  return (
    <div
      className={cn(
        'bg-secondary-100',
        styles[`variant-${variant}`],
        styles.TextContainer,
        className,
      )}
      {...props}
    />
  )
}
