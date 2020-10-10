import { CUTE_FACE } from 'config/view'
import React from 'react'
import cn from 'clsx'

const messages = {
  words: 'Слов нет',
}

const NoProblems = ({
  className,
  type = 'words',
}: {
  className?: string
  type?: keyof typeof messages
}) => (
  <div className={cn('flex items-center justify-center', className)}>
    <h2 className={'text-center'}>
      {messages[type]}
      <br />
      {CUTE_FACE}
    </h2>
  </div>
)
export default NoProblems
