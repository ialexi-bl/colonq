import { CUTE_FACE } from 'config/view'
import CenteredBox from 'components/shared/CenteredBox'
import React from 'react'
import Title from 'components/shared/Title'

const messages = {
  words: 'Слов нет',
}

const NoProblems = ({
  className,
  type = 'words',
}: {
  className?: string
  type?: keyof typeof messages
}) => (
  <CenteredBox className={className}>
    <Title level={2} centered>
      {messages[type]}
      <br />
      {CUTE_FACE}
    </Title>
  </CenteredBox>
)
export default NoProblems
