import { CSSTransition } from 'react-transition-group'
import Loading from '../Loading'
import cn from 'clsx'
import styles from './FullscreenLoading.module.scss'

const TIMEOUT = parseInt(styles.transitionDuration)
const CLASS_NAME = styles.transitionClassName

export type GlobalLoadingProps = {
  visible?: boolean
  absolute?: boolean
}

export default function GlobalLoading({
  visible,
  absolute,
}: GlobalLoadingProps) {
  return (
    <CSSTransition
      unmountOnExit
      mountOnEnter
      classNames={CLASS_NAME}
      timeout={TIMEOUT}
      in={visible}
    >
      <div
        className={cn(
          'inset-0 bg-secondary-1000 z-loading flex items-center justify-center',
          absolute ? 'absolute' : 'fixed',
          styles.RouteLoading,
        )}
      >
        <Loading />
      </div>
    </CSSTransition>
  )
}
