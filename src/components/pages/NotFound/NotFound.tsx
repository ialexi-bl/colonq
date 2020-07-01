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
        <Letter>4</Letter>
        <ActiveLetter>0</ActiveLetter>
        <WrongLetter>4</WrongLetter>
      </LetterTitle>
      <p>Такой страницы нет</p>
    </TitleLine>
  </PageContainer>
)
