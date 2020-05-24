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
        <TitleLetter>4</TitleLetter>
        <ActiveTitleLetter>0</ActiveTitleLetter>
        <RedTitleLetter>4</RedTitleLetter>
      </StyledTitle>
      <Subtitle>Такой страницы нет</Subtitle>
    </TitleLine>
  </PageContainer>
)
