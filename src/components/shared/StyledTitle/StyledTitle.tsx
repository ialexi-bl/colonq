import { Title } from 'components/shared/Title'
import {
  choiceButtonClassName,
  choiceButtonCorrectClassName,
  choiceButtonIncorrectClassName,
} from 'components/applets/ChoiceButton'
import React from 'react'
import cn from 'clsx'
import styles from './StyledTitle.module.scss'

export const StyledTitle = ({
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

export const TitleLetter = ({ children }: { children: string }) => (
  <div>{children}</div>
)
export const ActiveTitleLetter = ({ children }: { children: string }) => (
  <div className={choiceButtonClassName}>{children}</div>
)
export const GreenTitleLetter = ({ children }: { children: string }) => (
  <div className={cn(choiceButtonClassName, choiceButtonCorrectClassName)}>
    {children}
  </div>
)
export const RedTitleLetter = ({ children }: { children: string }) => (
  <div className={cn(choiceButtonClassName, choiceButtonIncorrectClassName)}>
    {children}
  </div>
)
