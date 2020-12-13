import cn from 'clsx'
import styles from './Hr.module.scss'

export type HrProps = HTMLProps.hr & {
  variant?: 1 | 2 | 3 | 4
}

const Hr = ({ variant, className, ...props }: HrProps) => (
  <hr
    className={cn(
      styles.Hr,
      className,
      variant && styles[`variant-${variant}`],
    )}
    {...props}
  />
)
export default Hr
