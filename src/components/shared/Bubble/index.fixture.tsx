import { useValue } from 'react-cosmos/fixture'
import Accents from 'components/icons/apps/russian/accents'
import Bubble from './Bubble'

export default function BubbleFixture() {
  const [progress, setProgress] = useValue<number>('progress', {
    defaultValue: 1,
  })

  return (
    <div
      style={{
        display: 'grid',
        padding: '2rem',
        grid: 'repeat(6, auto) / 200px',
        gridGap: '1rem',
      }}
    >
      <Bubble variant={1} icon={<Accents />} progress={progress} />
      <Bubble variant={2} icon={<Accents />} progress={progress} />
      <Bubble variant={3} icon={<Accents />} progress={progress} />
      <Bubble variant={4} icon={<Accents />} progress={progress} />
      <input
        value={progress}
        onChange={(e) => setProgress(+e.target.value)}
        type={'range'}
        min={0}
        max={1}
        step={0.005}
      />
    </div>
  )
}
