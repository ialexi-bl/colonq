import { InvisibleInput } from 'components/form/Input'
import { MixedDispatch } from 'store/types'
import { notifyErrorObject, notifyInfo } from 'store/view'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useState } from 'react'
import Accordion from 'components/shared/Accordion'
import Done from 'components/icons/Done'
import ErrorMessage from 'components/form/ErrorMessage'
import cn from 'clsx'

export type FieldEditorProps = {
  defaultValue: string
  validate?: (value: string) => null | string
  message?: string
  method: (value: string) => Promise<unknown>
  email?: boolean
}

export default function FieldEditor({
  defaultValue,
  validate,
  message,
  method,
  email,
}: FieldEditorProps) {
  // TODO: remove this hack maybe
  const [cleanValue, setCleanValue] = useState(defaultValue)
  const dispatch = useDispatch<MixedDispatch>()

  const formik = useFormik({
    initialValues: { value: defaultValue },
    validate: ({ value }) => {
      const result = validate?.(value) || null
      return result ? { value: result } : {}
    },
    onSubmit: ({ value }) => {
      if (formik.status === 'loading' || defaultValue === value) {
        return
      }

      formik.setStatus('loading')
      method(value)
        .then(() => {
          if (message) dispatch(notifyInfo(message))
          formik.setStatus('success')
          setCleanValue(value)
        })
        .catch((e) => {
          dispatch(notifyErrorObject(e))
          formik.setStatus(null)
        })
    },
  })

  const modified = formik.values.value !== cleanValue
  const form = (
    <form onSubmit={formik.handleSubmit}>
      <div className={'flex'}>
        <InvisibleInput
          className={'flex-1'}
          readOnly={formik.status === 'loading'}
          state={formik.errors.value ? 'invalid' : null}
          {...formik.getFieldProps('value')}
          onChange={(e) => {
            formik.setStatus(null)
            formik.handleChange(e)
          }}
        />
        <button
          type={'submit'}
          tabIndex={modified ? 0 : -1}
          className={cn(
            'ml-2 w-6 duration-200 focus:text-gray-600',
            !modified && 'opacity-0',
          )}
        >
          <Done />
        </button>
      </div>
      <ErrorMessage message={formik.touched.value && formik.errors.value} />
    </form>
  )

  return !email ? (
    form
  ) : (
    <Accordion
      expanded={formik.status === 'success'}
      summary={form}
      details={
        <div className={'text-base'}>
          Письмо с ссылкой для подтверждения отправлено на этот адрес. Пока ты
          не перейдёшь по ней, адрес не изменится
        </div>
      }
    />
  )
}
