import { ScrollablePage } from 'components/shared/Page'
import Button from 'components/shared/Button'
import React from 'react'
import Toggle from 'components/form/Toggle'
import cn from 'clsx'

export default function Settings() {
  return (
    <ScrollablePage>
      <div className={'px-4'}>
        <ToggleItem
          label={'Анимации'}
          checked={true}
          onChange={() => {}}
          description={`Ты можешь отключить переходы между страницами, если они плохо влияют на производительность. Не синхронизируется между устройствами`}
        />
        <ToggleItem
          label={'Уведомления'}
          checked={false}
          onChange={() => {}}
          className={'mb-16'}
          description={`Включи уведомления, чтобы не забывать о занятиях`}
        />

        <h2 className={'text-2xl'}>Приложение</h2>
        <p className={'mb-2 text-faded'}>
          Установи ColonQ на рабочий стол, чтобы использовать её как обычное
          приложение
        </p>
        <div className={'flex flex-col align-center text-lg px-4'}>
          <Button>Установить</Button>
        </div>
      </div>
    </ScrollablePage>
  )
}

type ToggleItemProps = {
  description: string
  className?: string
  checked?: boolean
  label: string
  onChange(value: boolean): unknown
}
function ToggleItem({
  description,
  className,
  onChange,
  checked,
  label,
}: ToggleItemProps) {
  return (
    <div className={cn('w-full flex items-center mb-6', className)}>
      <div className={'flex-grow'}>
        <h3 className={'text-2xl'}>{label}</h3>
        <p className={'text-sm text-faded'}>{description}</p>
      </div>
      <Toggle
        className={'ml-2 flex-shrink-0'}
        onChange={onChange}
        checked={checked}
      />
    </div>
  )
}
