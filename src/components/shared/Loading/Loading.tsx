import Logo from 'components/icons/Logo'
import { memo } from 'react';
import cn from 'clsx'
import styles from './Loading.module.scss'

const Loading = memo(({ className, ...props }: HTMLProps.div) => (
  <div className={cn(className, styles.Logo)} {...props}>
    <Logo animated thin />
  </div>
))
export default Loading
