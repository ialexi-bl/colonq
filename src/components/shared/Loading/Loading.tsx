import { Logo } from '../../icons/Logo'
import React from 'react'
import cn from 'clsx'
import styles from './Loading.module.scss'

export default React.memo(
  ({ className, ...props }: Omit<DivProps, 'children'>) => (
    <div className={cn(className, styles.Logo)} {...props}>
      <Logo thin />
    </div>
  ),
)
