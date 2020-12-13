import cn from 'clsx'
import styles from './LogoAnimation.module.scss'

export type LogoProps = HTMLProps.svg & {
  animated?: boolean
  thin?: boolean
}

const Logo = ({ thin, animated, className, ...props }: LogoProps) => (
  <svg
    {...props}
    fill={'none'}
    stroke={'currentColor'}
    viewBox={'0 0 96 96'}
    className={cn(className, animated ? '' : styles.still)}
    strokeWidth={thin ? 5 : 5}
  >
    <path
      d={
        'M54.5007 82.5145C39.0007 82.7645 22.0007 77.2645 24.5007 42.2645C27.0007 7.26447 46.1464 9.01446 54.5007 9.01446C79.0007 11.7645 86.657 26.2645 86.657 45.7645C86.657 72.2645 70.0007 82.2645 54.5007 82.5145Z'
      }
      className={styles.logoQBody}
    />
    <path d={'M26.5 59.5L41 49L84.5 83'} className={styles.logoQTail} />
    <path
      d={
        'M9.12566 32.2644C9.00066 34.2644 10.0288 36.0144 12.8757 36.0144C15.7226 36.0144 16.4791 34.1095 16.6257 32.2644C17.0297 28.5144 13.0969 28.5144 12.8757 28.5144C10.7204 28.5144 9.25066 30.2644 9.12566 32.2644Z'
      }
      className={styles.logoDot1}
    />
    <path
      d={
        'M9.00676 59.8999C8.88176 61.8999 10.5007 63.7644 13.0007 63.7644C15.5502 63.7644 16.5068 61.6499 16.5068 59.8999C16.5068 58.1499 15.0007 56.1499 12.7568 56.1499C10.6015 56.1499 9.13176 57.8999 9.00676 59.8999Z'
      }
      className={styles.logoDot2}
    />
  </svg>
)
export default Logo
