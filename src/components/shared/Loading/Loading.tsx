import { Logo } from 'components/icons/Logo'
import React from 'react'
import cn from 'clsx'
import styles from './Loading.module.scss'

export const Loading = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(className, styles.Logo)} {...props}>
    <Logo thin />
  </div>
)
