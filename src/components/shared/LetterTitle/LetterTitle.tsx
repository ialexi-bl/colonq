import React from 'react'
import Title from 'components/shared/Title'
import cn from 'clsx'
import styles from './LetterTitle.module.scss'

export type LetterProps = { children: string }

const LetterTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <Title level={1} className={cn(className, styles.StyledTitle)}>
    {children}
  </Title>
)
export default LetterTitle

// TODO: refactor choiceButton class names
export const Letter = ({ children }: LetterProps) => <div>{children}</div>
export const ActiveLetter = ({ children }: LetterProps) => <div>{children}</div>
export const CorrectLetter = ({ children }: LetterProps) => (
  <div>{children}</div>
)
export const WrongLetter = ({ children }: LetterProps) => <div>{children}</div>
