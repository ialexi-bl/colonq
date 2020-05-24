import React, { SVGAttributes } from 'react'
import styles from './LogoAnimation.module.scss'

export const Logo = React.memo(
  React.forwardRef(
    (
      {
        thin,
        ...props
      }: SVGAttributes<SVGSVGElement> & {
        thin?: boolean
      },
      ref: React.Ref<SVGSVGElement>,
    ) => (
      <svg
        {...props}
        ref={ref}
        xmlns={'http://www.w3.org/2000/svg'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={thin ? '18' : '28'}
        viewBox={'0 0 512 512'}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
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
    ),
  ),
)
