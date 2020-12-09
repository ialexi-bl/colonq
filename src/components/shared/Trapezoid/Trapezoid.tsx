import React from 'react'
import cn from 'clsx'
import shapes from './Trapezoid.shape.svg'
import styles from './Trapezoid.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type TrapezoidProps = HTMLProps.div & {
  variant?: 1 | 2 | 3 | 4 | 5 | 6
}

const Trapezoid = ({ className, variant, ...props }: TrapezoidProps) => (
  useClipShape('trapezoid', shapes),
  (<div className={cn(className, styles[`variant-${variant}`])} {...props} />)
)
export default Trapezoid
