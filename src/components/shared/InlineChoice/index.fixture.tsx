/* eslint-disable react-hooks/rules-of-hooks */
import { useValue } from 'react-cosmos/fixture'
import InlineChoice from './InlineChoice'

const options = ['пре', 'при', 'пра', 'про']

export default () => {
  const [correctAnswer] = useValue('correct answer', { defaultValue: 1 })
  const [active] = useValue('active', { defaultValue: true })
  const [answer, setAnswer] = useValue<undefined | number>('answer', {
    defaultValue: undefined,
  })

  return (
    <div style={{ fontSize: 32 }}>
      <InlineChoice
        correctAnswer={correctAnswer}
        onChange={setAnswer}
        options={options}
        active={active}
        answer={answer}
      />
    </div>
  )
}
