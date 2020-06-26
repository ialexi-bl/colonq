import { Title } from 'components/shared/Title'
import {
  choiceButtonClassName,
  choiceButtonCorrectClassName,
  choiceButtonIncorrectClassName,
} from 'components/applets/ChoiceButton'
import React from 'react'
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
export const ActiveLetter = ({ children }: LetterProps) => (
  <div className={choiceButtonClassName}>{children}</div>
)
export const CorrectLetter = ({ children }: LetterProps) => (
  <div className={cn(choiceButtonClassName, choiceButtonCorrectClassName)}>
    {children}
  </div>
)
export const WrongLetter = ({ children }: LetterProps) => (
  <div className={cn(choiceButtonClassName, choiceButtonIncorrectClassName)}>
    {children}
  </div>
)
