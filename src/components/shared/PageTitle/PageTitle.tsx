import { ReactNode } from 'react'
import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import Back from 'components/icons/Back'
import cn from 'clsx'

export type PageTitleProps = Childfree<HTMLProps.heading> & {
  disableBackButton?: boolean
  children: string
  icon?: ReactNode
}

const PageTitle = ({
  children,
  icon,
  className,
  disableBackButton,
  ...props
}: PageTitleProps) => {
  const dispatch = useDispatch()

  return (
    <h1
      className={cn(className, 'py-2 px-4 text-4xl flex items-center my-6')}
      {...props}
    >
      {(icon || !disableBackButton) && (
        <span
          className={cn(icon ? 'h-12 w-12' : 'h-8 w-8', 'd-inline-block mr-4')}
        >
          {icon || <Back onClick={() => dispatch(goBack())} />}
        </span>
      )}
      {children}
    </h1>
  )
}
export default PageTitle
