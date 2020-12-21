import { Link, LinkProps } from 'react-router-dom'
import cn from 'clsx'
import paths from './button.shape.svg'
import styles from './Button.module.scss'
import useClipShape from 'hooks/use-clip-shape'

type CommonProps = {
  secondary?: boolean
  variant?: 1 | 2 | 3
}
export type ButtonProps = HTMLProps.button & CommonProps
export type LinkButtonProps = LinkProps & CommonProps
export type LinkButtonExternalProps = HTMLProps.a & CommonProps

const Button = ({
  secondary,
  className,
  disabled,
  variant = 1,
  ...props
}: ButtonProps) => (
  useClipShape('button', paths),
  (
    <button
      disabled={disabled}
      className={cn(className, buttonClassNames(variant, secondary, disabled))}
      {...props}
    />
  )
)
export default Button

export const LinkButton = ({
  secondary,
  className,
  variant = 1,
  ...props
}: LinkButtonProps) => (
  useClipShape('button', paths),
  (
    <Link
      className={cn(
        className,
        'text-center',
        buttonClassNames(variant, secondary, false),
      )}
      {...props}
    />
  )
)
export const LinkButtonExternal = ({
  secondary,
  className,
  variant = 1,
  ...props
}: LinkButtonExternalProps) => (
  useClipShape('button', paths),
  (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      className={cn(
        className,
        'text-center',
        buttonClassNames(variant, secondary, false),
      )}
      {...props}
    />
  )
)

const buttonClassNames = (
  variant?: 1 | 2 | 3,
  secondary?: boolean,
  disabled?: boolean,
) =>
  cn(
    styles[`variant-${variant}`],
    'py-4 px-6 duration-200 bg-cover bg-center bg-no-repeat cursor-pointer',
    {
      [`bg-secondary-200 focus:bg-secondary-400 ${styles.secondary}`]:
        !disabled && secondary,
      [`bg-primary-700 focus:bg-primary-900 ${styles.primary}`]:
        !disabled && !secondary,
      'bg-disabled-700': disabled,
    },
  )
