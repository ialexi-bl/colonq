import { CUTE_FACE } from 'config/view'
import { Title } from 'components/shared/Title'
import React from 'react'
import styles from './NoWords.module.scss'

export const NoWords = () => (
  <Title level={2} className={styles.NoWords}>
    Слов нет
    <br />
    {CUTE_FACE}
  </Title>
)
