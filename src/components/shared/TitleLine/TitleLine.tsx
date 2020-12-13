import * as React from 'react';
import cn from 'clsx'
import styles from './TitleLine.module.scss'

const TitleLine = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={styles.Container}>
    <div className={cn(className, styles.Line)}>{children}</div>
  </div>
)
export default TitleLine
