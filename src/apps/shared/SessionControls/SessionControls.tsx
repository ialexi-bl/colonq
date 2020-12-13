import { appsList } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import Exit from 'components/icons/Exit'
import Hide from 'components/icons/Hide'
import cn from 'clsx'

export default function SessionControls({ className, children }: BasicProps) {
  return <div className={cn(className, 'flex px-2 pb-4')}>{children}</div>
}

export function SessionExit() {
  const dispatch = useDispatch()
  return (
    <Exit
      className={'opacity-25 w-12 h-12 mr-4'}
      onClick={() => dispatch(push(appsList()))}
    />
  )
}

export function SessionHide({ hide }: { hide: () => unknown }) {
  return <Hide className={'opacity-25 w-12 h-12'} onClick={hide} />
}
