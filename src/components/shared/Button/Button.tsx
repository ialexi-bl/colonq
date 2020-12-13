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

const buttonClassNames = (
  variant?: 1 | 2 | 3,
  secondary?: boolean,
  disabled?: boolean,
) =>
  cn(
    buttonCn,
    styles[`variant-${variant}`],
    disabled ? disabledCn : secondary ? secondaryCn : primaryCn,
  )

const buttonCn =
  'py-4 px-6 duration-200 bg-cover bg-center bg-no-repeat cursor-pointer'
const primaryCn = `bg-primary-700 ${styles.primary}`
const secondaryCn = `bg-secondary-200 ${styles.secondary}`
const disabledCn = `bg-disabled-700`
