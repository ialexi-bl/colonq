import LetterTitle, {
  ActiveLetter,
  CorrectLetter,
  Letter,
  WrongLetter,
} from './LetterTitle'
import React from 'react'

export default () => {
  return (
    <div style={{ padding: 10 }}>
      <LetterTitle>
        <Letter>C</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>L</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>N</Letter>
        <CorrectLetter>Q</CorrectLetter>
      </LetterTitle>
      <LetterTitle>
        <Letter>4</Letter>
        <ActiveLetter>0</ActiveLetter>
        <WrongLetter>4</WrongLetter>
      </LetterTitle>
    </div>
  )
}
