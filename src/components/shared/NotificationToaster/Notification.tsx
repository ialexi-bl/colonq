import { NotificationType } from 'store/view'
import { useIsNavigationVisible } from '../Navigation'
import Close from 'components/icons/Close'
import TextWithLinks from '../TextWithLinks/TextWithLinks'
import cn from 'clsx'
import paths from './notification.shape.svg'
import styles from './Notification.module.scss'
import useClipShape from 'hooks/use-clip-shape'

export type NotificationProps = {
  text: string
  type: NotificationType
  close: () => unknown
}

export function Notification({ text, type, close }: NotificationProps) {
  useClipShape('notification', paths)

  return (
    <div
      className={cn(
        styles.Notification,
        useIsNavigationVisible() ? 'pb-20' : 'pb-6',
        'z-notification pt-6 px-12 duration-300 leading-5',
        'fixed inset-x-0 bottom-0 text-light',
        'sm:pb-6 lg:inset-x-auto lg:right-4 lg:max-w-sm lg:bottom-4',
        type === 'error' ? 'bg-error' : 'bg-primary-900',
      )}
    >
      <button
        className={styles.DismissButton}
        onClick={close}
        title={'Закрыть'}
      >
        <Close />
      </button>
      <div className={'container mx-auto'}>
        <TextWithLinks>{text}</TextWithLinks>
      </div>
    </div>
  )
}
