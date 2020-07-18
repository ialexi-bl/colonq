import React from 'react'
import styles from './LogoAnimation.module.scss'

export type LogoProps = HTMLProps.svg & {
  animated?: boolean
  thin?: boolean
}

const Logo = ({ thin, animated, ...props }: LogoProps) => (
  <svg
    {...props}
    fill={'none'}
    stroke={'currentColor'}
    viewBox={'0 0 512 512'}
    className={animated ? '' : styles.steady}
    strokeWidth={thin ? 18 : 28}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
  >
    <path
      d={'M 54, 184 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0'}
      className={styles.logoDot1}
    />
    <path
      d={'M 54, 348 a 20,20 0 10 40,0 a 20,20 0 1,0 -40,0'}
      className={styles.logoDot2}
    />
    <path
      d={'M 296, 452 a 168,196 0 0,1 0,-392 a168,192 0 0,1 0, 392'}
      className={styles.logoQBody}
    />
    <path d={'M170 383 L 210 242 L442 447'} className={styles.logoQTail} />
  </svg>
)
export default Logo
