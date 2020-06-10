import {
  ActiveLetter,
  Letter,
  LetterTitle,
  WrongLetter,
} from 'components/shared/LetterTitle'
import { PageContainer } from 'components/shared/Page'
import { Subtitle } from 'components/shared/Subtitle'
import { TitleLine } from 'components/shared/TitleLine'
import React from 'react'

export default () => (
  <PageContainer>
    <TitleLine>
      <LetterTitle>
        <Letter>4</Letter>
        <ActiveLetter>0</ActiveLetter>
        <WrongLetter>4</WrongLetter>
      </LetterTitle>
      <Subtitle>Такой страницы нет</Subtitle>
    </TitleLine>
  </PageContainer>
)
