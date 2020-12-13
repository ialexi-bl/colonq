import Trapezoid from '../Trapezoid/Trapezoid'
import cn from 'clsx'
import styles from './TextContainer.module.scss'

export type TextContainerProps = HTMLProps.div & {
  variant?: 1 | 2 | 3
}
export default function TextContainer({
  variant = 1,
  className,
  ...props
}: TextContainerProps) {
  return (
    <Trapezoid
      variant={(variant * 2) as 1}
      className={cn('bg-secondary-100', styles.Trapezoid, className)}
      {...props}
    />
  )
}
