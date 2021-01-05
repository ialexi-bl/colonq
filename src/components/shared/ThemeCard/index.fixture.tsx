import { useValue } from 'react-cosmos/fixture'
import Accents from 'components/icons/apps/russian/accents'
import ThemeCard from './ThemeCard'

export default function ThemeCardFixture() {
  const [progress, setProgress] = useValue<number>('progress', {
    defaultValue: 1,
  })

  return (
    <div style={{ width: 450, padding: 20 }}>
      <ThemeCard
        title={'Ударения'}
        variant={1}
        icon={<Accents />}
        progress={progress}
      />
      <ThemeCard
        title={'Ударения'}
        variant={2}
        icon={<Accents />}
        progress={progress}
      />
      <ThemeCard
        title={'Ударения'}
        variant={3}
        icon={<Accents />}
        progress={progress}
      />
      <ThemeCard
        title={'Ударения'}
        variant={4}
        icon={<Accents />}
        progress={progress}
      />
      <input
        value={progress}
        style={{ marginTop: 50 }}
        onChange={(e) => setProgress(+e.target.value)}
        type={'range'}
        min={0}
        max={1}
        step={0.005}
      />
    </div>
  )
}
