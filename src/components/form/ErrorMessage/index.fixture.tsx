/* eslint-disable react-hooks/rules-of-hooks */
import { ErrorMessage } from '.'
import { Input } from '../Input'
import { useValue } from 'react-cosmos/fixture'
import React, { useEffect } from 'react'

const messages = [
  "(1) I'm an error",
  // null,
  '(2) Oops, try again',
  '(3) Something went wrong',
  null,
]

export default {
  'Error message': () => {
    const [message] = useValue('message', { defaultValue: "I'm an error" })
    return (
      <div>
        <Input state={'invalid'} />
        <ErrorMessage message={message} />
      </div>
    )
  },
  'Error message changing': () => {
    const [speed] = useValue('speed', {
      defaultValue: 1000,
    })
    const [message, setMessage] = useValue('message', {
      defaultValue: messages[0],
    })

    useEffect(() => {
      let counter = messages.indexOf(message)
      const interval = setInterval(() => {
        setMessage(messages[(counter = (counter + 1) % messages.length)])
      }, speed)

      return () => {
        clearInterval(interval)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setMessage, speed])

    return (
      <div>
        <Input state={message ? 'invalid' : undefined} />
        <ErrorMessage message={message} />
      </div>
    )
  },
}
