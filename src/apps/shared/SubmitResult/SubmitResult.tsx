import { Api } from 'core/api/config'
import AchievementsDisplay from '../AchievementsDisplay'
import cn from 'clsx'

export type SubmitResultProps = {
  response: Api.Session.Submit | null
}
export default function SubmitResult({ response }: SubmitResultProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 duration-500 transform bg-secondary-900',
        !response && 'translate-y-full',
      )}
    >
      {response && <AchievementsDisplay delay={500} response={response} />}
    </div>
  )
}
