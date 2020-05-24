import { IRipple } from 'hooks/useRipples'
import React from 'react'
import styles from './RippleContainer.module.scss'

/**
 * Ripple element for buttons
 * @param props
 */
export const Ripple = React.memo(
  ({ x, y, size, background, duration }: IRipple) => (
    <span
      className={styles.Ripple}
      style={{
        top: y,
        left: x,
        width: size,
        height: size,
        background,
        animationDuration: `${duration}ms`,
      }}
    />
  ),
)
