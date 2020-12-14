import ChoicePhrase from './ChoicePhrase'

export default function ChoicePhraseFixture() {
  return (
    <div style={{ padding: 20 }}>
      <ChoicePhrase
        firstItem={true}
        active={true}
        next={() => {}}
        item={{
          id: 'w',
          problem: 'Лиса л_вка',
          options: ['о', 'а'],
          answer: 'а',
        }}
      />
    </div>
  )
}
