import { RegistrationFormValues } from './validate'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import React from 'react'

export type RegistrationInputProps = HTMLProps.input & {
  password?: boolean
  loading?: boolean
  formik: any
  title: string
  name: keyof RegistrationFormValues
  variant?: 1 | 2 | 3 | 4
}

const RegistrationInput = ({
  password,
  loading,
  formik,
  title,
  name,
  ...props
}: RegistrationInputProps) => (
  <label className={'block mb-4'}>
    <span className={'mb-2'}>{title}</span>
    <Input
      // TODO: add ability to show password
      type={password ? 'password' : 'text'}
      variant={2}
      readOnly={loading}
      state={getInputState(formik, name)}
      {...formik.getFieldProps(name)}
      {...props}
    />
    <ErrorMessage message={getErrorMessage(formik, name)} />
  </label>
)
export default RegistrationInput

// Can't type formik here, because there is no declaration for
// whatever `useFormik` returns
const getInputState = (formik: any, field: string) =>
  formik.touched[field] && formik.errors[field] !== 'pending'
    ? formik.errors[field]
      ? 'invalid'
      : 'valid'
    : null
const getErrorMessage = (formik: any, field: string) =>
  formik.touched[field] && formik.errors[field] !== 'pending'
    ? formik.errors[field]
    : null
