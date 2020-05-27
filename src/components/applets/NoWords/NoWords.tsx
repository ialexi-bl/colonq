import { CUTE_FACE } from 'config/view'
import { Title } from 'components/shared/Title'
import { cssUtil } from 'styles'
import React from 'react'
import cn from 'clsx'
import styles from './NoWords.module.scss'

export const NoWords = ({ className }: { className?: string }) => (
  <Title
    level={2}
    className={cn(
      cssUtil.fullSize,
      cssUtil.centered,
      styles.NoWords,
      className,
    )}
  >
    <span>Слов нет</span>
    <span>{CUTE_FACE}</span>
  </Title>
)
