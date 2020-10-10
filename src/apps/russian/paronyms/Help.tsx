import Button from 'components/shared/Button'
import React from 'react'
import styles from './Paronym.module.scss'

export function ParonymsHelp() {
  return (
    <div>
      <h2>Паронимы</h2>
      <p className={styles.HelpArticle}>
        В каждом предложении в поле ввода показывается случайный пароним,
        который может как подходить, так и не подходить к фразе. Если он
        неверный, напиши подходящий пароним и нажми ввод. Если в поле уже
        написан верный пароним, вводить его заново необязательно.
      </p>
      <Button className={styles.CloseHelp}>Понимаю</Button>
    </div>
  )
}
