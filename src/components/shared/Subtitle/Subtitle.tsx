import { Title } from 'components/shared/Title'
import React from 'react'
import cn from 'clsx'
import styles from './Subtitle.module.scss'

export default ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <Title level={2} className={cn(className, styles.Subtitle)}>
    {children}
  </Title>
)
