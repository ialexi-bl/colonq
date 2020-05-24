import { Input } from 'components/shared/Input'
import { Transition, TransitionGroup } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'
import React, { useState } from 'react'
import cn from 'clsx'
import styles from './ListEditor.module.scss'

function forCount<T>(count: number, cb: (index: number) => T): T[] {
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(cb(i))
  }

  return result
}

export type ListEditorProps = {
  count: number
  getId: (index: number) => string | number
  renderItem: (index: number, state: TransitionStatus) => React.ReactNode
} & (
  | {
      search: true
      getSearchItems: (search: string) => React.ReactNode
    }
  | {
      search?: false
      getSearchItems?: undefined
    }
)

export const ListEditor = React.forwardRef<HTMLDivElement, ListEditorProps>(
  function ListEditor(
    { count, getId, renderItem, search, getSearchItems },
    ref,
  ) {
    const [value, setSearch] = useState('')

    return (
      <div className={styles.Root} ref={ref}>
        {search && (
          <div className={styles.Search}>
            <Input placeholder={'Поиск'} value={value} onChange={setSearch} />
          </div>
        )}
        {value ? (
          getSearchItems!(value)
        ) : (
          <TransitionGroup component={null}>
            {forCount(count, (i) => (
              <Transition timeout={500} key={getId(i)}>
                {(state) => (
                  <div
                    className={cn(
                      styles.Item,
                      state === 'entering' && styles.ItemEntering,
                      state === 'exiting' && styles.ItemExiting,
                    )}
                  >
                    {renderItem(i, state)}
                  </div>
                )}
              </Transition>
            ))}
          </TransitionGroup>
        )}
      </div>
    )
  },
)
