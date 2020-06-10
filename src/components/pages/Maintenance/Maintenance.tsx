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
        <Letter>C</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>L</Letter>
        <ActiveLetter>O</ActiveLetter>
        <Letter>N</Letter>
        <WrongLetter>Q</WrongLetter>
      </LetterTitle>
      <Subtitle>Сайт на техобслуживании</Subtitle>
    </TitleLine>
  </PageContainer>
)
