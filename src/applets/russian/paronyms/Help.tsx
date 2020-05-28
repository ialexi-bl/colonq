import { AppletHelp } from 'components/applets/AppletHelp'
import { Button } from 'components/shared/Button'
import { Title } from 'components/shared/Title'
import React, { useState } from 'react'
import styles from './Paronym.module.scss'

export function ParonymsHelp() {
  const [open, setOpen] = useState(false)

  return (
    <AppletHelp open={open} setOpen={setOpen}>
      <Title level={2}>Паронимы</Title>
      <p className={styles.HelpArticle}>
        В каждом предложении в поле ввода показывается случайный пароним,
        который может как подходить, так и не подходить к фразе. Если он
        неверный, напиши подходящий пароним и нажми ввод. Если в поле уже
        написан верный пароним, вводить его заново необязательно.
      </p>
      <Button className={styles.CloseHelp} onClick={() => setOpen(false)}>
        Понимаю
      </Button>
    </AppletHelp>
  )
}