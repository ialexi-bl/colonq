import { FieldInputProps, FieldMetaProps } from 'formik'
import { memo } from 'react'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import cn from 'clsx'

export type CompoundInputProps = HTMLProps.input & {
  password?: boolean
  loading?: boolean
  variant?: 1 | 2 | 3
  title: string
  props: FieldInputProps<string>
  meta: FieldMetaProps<string>
}

const CompoundInput = memo(
  ({
    className,
    password,
    loading,
    variant,
    meta,
    title,
    name,
    props,
    ...rest
  }: CompoundInputProps) => (
    <label className={cn(className, 'block mb-4')}>
      <span className={'mb-2'}>{title}</span>
      <Input
        // TODO: add ability to show password
        className={'w-full'}
        readOnly={loading}
        variant={variant}
        state={getInputState(meta)}
        type={password ? 'password' : 'text'}
        {...props}
        {...rest}
      />
      <ErrorMessage message={getErrorMessage(meta)} />
    </label>
  ),
)
export default CompoundInput

// Can't type formik here, because there is no declaration for
// whatever `useFormik` returns
const getInputState = (meta: FieldMetaProps<string>) => {
  if (!meta.touched) return null

  const error = meta.error as null | string | { type: string }
  if (error && typeof error === 'object') {
    return error.type === 'warning' ? 'warning' : 'invalid'
  }
  if (error !== 'pending') {
    return error ? 'invalid' : 'valid'
  }
  return null
}
const getErrorMessage = (meta: FieldMetaProps<string>) =>
  meta.touched && meta.error !== 'pending' ? meta.error : null
