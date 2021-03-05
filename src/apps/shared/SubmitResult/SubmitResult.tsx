import { Api } from 'core/api/config'
import AchievementsDisplay from '../AchievementsDisplay'
import Popup from 'components/shared/Popup'

export type SubmitResultProps = {
  response: Api.Session.Submit | null
}
export default function SubmitResult({ response }: SubmitResultProps) {
  return (
    <Popup shown={response}>
      {response && <AchievementsDisplay delay={500} response={response} />}
    </Popup>
  )
}
