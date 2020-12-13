import * as React from 'react';
import cn from 'clsx'
import styles from './Toggle.module.scss'

export type ToggleProps = Omit<HTMLProps.input, 'onChange'> & {
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => unknown
}

const Toggle = ({ className, onChange, ...props }: ToggleProps) => (
  <label className={cn(className, styles.Container)}>
    <input
      type={'checkbox'}
      className={styles.ToggleInput}
      onChange={onChange && ((e) => onChange?.(e.target.checked, e))}
      {...props}
    />
    <div className={styles.Track} />
    <div className={styles.Slider} />
  </label>
)
export default Toggle
