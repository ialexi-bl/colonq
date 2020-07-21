import ChoicePhrase from './ChoicePhrase'
import React from 'react'

export default () => {
  return (
    <div style={{ padding: 20 }}>
      <ChoicePhrase
        phrase={'Лиса л[оА]вка'}
        getOptionsForWord={(word) => {
          const match = word.match(/(.*?)\[(.+?)\](.*)/)

          return (
            match && {
              end: match[3],
              start: match[1],
              options: match[2].toLowerCase().split(''),
              correctAnswer: 1,
            }
          )
        }}
      />
    </div>
  )
}
