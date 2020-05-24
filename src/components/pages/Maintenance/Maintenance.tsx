import {
  ActiveTitleLetter,
  RedTitleLetter,
  StyledTitle,
  TitleLetter,
} from 'components/shared/StyledTitle'
import { PageContainer } from 'components/shared/Page'
import { Subtitle } from 'components/shared/Subtitle'
import { TitleLine } from 'components/shared/TitleLine'
import React from 'react'

export default () => (
  <PageContainer>
    <TitleLine>
      <StyledTitle>
        <TitleLetter>C</TitleLetter>
        <ActiveTitleLetter>O</ActiveTitleLetter>
        <TitleLetter>L</TitleLetter>
        <ActiveTitleLetter>O</ActiveTitleLetter>
        <TitleLetter>N</TitleLetter>
        <RedTitleLetter>Q</RedTitleLetter>
      </StyledTitle>
      <Subtitle>Сайт на техобслуживании</Subtitle>
    </TitleLine>
  </PageContainer>
)
