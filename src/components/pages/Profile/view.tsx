import { notifyInfo } from 'store/view'
import { unauthenticate } from 'store/user'
import { useDispatch } from 'react-redux'
import Accordion from 'components/shared/Accordion'
import AuthService from 'core/api/services/auth'
import Button from 'components/shared/Button'
import LangNotifications from 'lang/notifications.json'
import cn from 'clsx'
import useToggle from 'hooks/use-toggle'

export const Section = ({ className, children }: BasicProps) => {
  return <section className={cn('px-4', className)}>{children}</section>
}

export const SettingItem = ({
  children,
  sub,
}: BasicProps & { sub?: boolean }) => (
  <div className={cn('flex items-center py-2', sub && 'pl-2')}>{children}</div>
)
export const SettingItemLabel = ({
  children,
  sub,
}: BasicProps & { sub?: boolean }) => (
  <p className={cn('flex-1', sub ? 'text-base' : 'text-lg')}>{children}</p>
)
export const SettingItemContent = (props: HTMLProps.div) => <div {...props} />

export function Logout() {
  const [started, toggleStarted] = useToggle(false)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))
    AuthService.logout()
  }

  return (
    <Accordion
      // inline-block to prevent spanning the entire width
      className={'block text-center'}
      expanded={started}
      summary={
        <Button
          className={'mt-6 w-64 text-lg'}
          onClick={toggleStarted}
          secondary
        >
          Выход
        </Button>
      }
      details={
        <div className={'text-center'}>
          <p>Точно хочешь выйти?</p>
          <Button secondary onClick={logout} className={'max-w-xs'}>
            Подтвердить
          </Button>
        </div>
      }
    />
  )
}
