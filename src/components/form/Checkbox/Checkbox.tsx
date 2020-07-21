import React from 'react'
import cn from 'clsx'
import styles from './Checkbox.module.scss'

export type CheckboxProps = Omit<HTMLProps.input, 'onChange'> & {
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => unknown
}

/**
 * Simple checkbox
 * @param {CheckboxProps} props
 */
const Checkbox = ({ className, onChange, ...props }: CheckboxProps) => (
  <label className={cn(className, styles.Container)}>
    <input
      type={'checkbox'}
      className={styles.CheckboxInput}
      onChange={onChange && ((e) => onChange?.(e.target.checked, e))}
      {...props}
    />
    <div className={styles.Checkbox} />
    <svg className={styles.Tick} viewBox={'0 0 20 20'}>
      <path
        d={'M5,11L9,14L15,6'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        fill={'none'}
      />
    </svg>
  </label>
)
export default Checkbox
