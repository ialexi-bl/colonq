import LetterButton from './LetterButton'
import React, { ReactNode } from 'react'

export default () => (
  <>
    <Cont>
      <LetterButton>A</LetterButton>
      <LetterButton>A</LetterButton>
      <LetterButton>A</LetterButton>
      <LetterButton>A</LetterButton>
    </Cont>
    <Cont>
      <LetterButton state={'correct'}>A</LetterButton>
      <LetterButton state={'correct'}>A</LetterButton>
      <LetterButton state={'correct'}>A</LetterButton>
      <LetterButton state={'correct'}>A</LetterButton>
    </Cont>
    <Cont>
      <LetterButton state={'incorrect'}>A</LetterButton>
      <LetterButton state={'incorrect'}>A</LetterButton>
      <LetterButton state={'incorrect'}>A</LetterButton>
      <LetterButton state={'incorrect'}>A</LetterButton>
    </Cont>
  </>
)

const Cont = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: 40,
      fontSize: '3rem',
      width: 400,
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
)
