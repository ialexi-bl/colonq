import { CSSTransition } from 'react-transition-group'
import Button from 'components/shared/Button'
import ControlledScrollbars from 'components/shared/ControlledScrollbars'
import PageTitle from 'components/shared/PageTitle'
import React, { useContext } from 'react'
import WordsAppletContext from './context'
import WordsEditor from '../WordsEditor'
import cn from 'clsx'
import styles from './WordsApplet.module.scss'

const className = styles.transitionClassName
const duration = parseInt(styles.transitionDuration)

export type WordsStartScreenProps = {
  running: boolean
  start: () => unknown
}

export default function WordsStartScreen({
  running,
  start,
}: WordsStartScreenProps) {
  const { title, icon, description, manager } = useContext(WordsAppletContext)

  return (
    <CSSTransition timeout={duration} classNames={className}>
      <ControlledScrollbars>
        <PageTitle className={styles.transitionUp} icon={icon}>
          {title}
        </PageTitle>
        <div className={'px-4 pb-64'}>
          <div className={cn(styles.transitionUp, 'mb-64')}>{description}</div>

          <div className={'flex flex-col px-8 text-2xl mb-32'}>
            <Button onClick={start}>Начать</Button>
          </div>

          <h2 className={'text-3xl mb-1'}>Список слов</h2>
          <p className={'text-faded mb-4'}>
            Это список слов, из которых составлены задания. Ты можешь выключать
            те слова, которые уже хорошо знаешь или которые не считаешь важными
          </p>
          <WordsEditor manager={manager} />
        </div>
      </ControlledScrollbars>
    </CSSTransition>
  )
}
