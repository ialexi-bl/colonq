import React from 'react'

export type WordsSessionProps = {
  running: boolean
  finish: () => unknown
}

export default function WordsSession({ running, finish }: WordsSessionProps) {
  return <div></div>
}
