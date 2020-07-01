import { PageContainer } from 'components/shared/Page'
import LetterTitle, {
  ActiveLetter,
  Letter,
  WrongLetter,
} from 'components/shared/LetterTitle'
import React from 'react'
import TitleLine from 'components/shared/TitleLine'

export default () => (
  <PageContainer>
    <TitleLine>
      <LetterTitle>
        <Letter>C</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>L</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>N</Letter>
        <WrongLetter>Q</WrongLetter>
      </LetterTitle>
      <p>Сайт на техобслуживании</p>
    </TitleLine>
  </PageContainer>
)
