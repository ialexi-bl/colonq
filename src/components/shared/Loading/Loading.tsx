import Logo from 'components/icons/Logo'
import React from 'react'
import cn from 'clsx'
import styles from './Loading.module.scss'

const Loading = ({ className, ...props }: HTMLProps.div) => (
  <div className={cn(className, styles.Logo)} {...props}>
    <Logo animated thin />
  </div>
)
export default Loading
