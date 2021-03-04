import { Api } from 'core/api/config'
import { LinkButton } from 'components/shared/Button'
import { MixedDispatch } from 'store/types'
import { app as appRoute } from 'config/routes'
import { notifyErrorObject } from 'store/view'
import { useDispatch } from 'react-redux'
import PageTitle from 'components/shared/PageTitle'
import SettingsService from 'core/api/services/settings'
import StagesEditor from 'components/shared/StagesEditor'
import useAppTitle from 'hooks/use-app-title'
import useSave from 'hooks/use-save'
import useSettingsControls, {
  StagesControlsDispatch,
} from './use-settings-controls'

export type SettingsViewProps = {
  app: string
  settings: Api.Settings.Get
}

export default function Settings({
  app,
  settings: _settings,
}: SettingsViewProps) {
  const { settings, modified, resetModified } = useSettingsControls(_settings)
  const dispatch = useDispatch<MixedDispatch>()
  const title = useAppTitle(app)

  useSave(!!modified, modified, async () => {
    try {
      await SettingsService.changeSettings(app, modified!)
      resetModified()
    } catch (e) {
      return dispatch(notifyErrorObject(e))
    }
  })

  return (
    <div className={'container pb-72'}>
      <PageTitle>Настройки приложения {title}</PageTitle>
      <div className={'flex'}>
        <section className={'flex-1 mx-auto max-w-2xl'}>
          <div className={'px-4'}>
            {settings.map((setting) => {
              switch (setting.type) {
                case 'stages':
                  return (
                    <StagesControls
                      key={setting.id}
                      dispatch={setting.dispatch}
                      stagesControls={setting.data}
                    />
                  )
                default:
                  return null
              }
            })}
          </div>
        </section>
        <section className={'w-1/3 top-0 hidden md:flex flex-col items-center'}>
          <LinkButton to={appRoute(app, 'practice')} className={'min-w-72'}>
            Начать занятие
          </LinkButton>
        </section>
      </div>
    </div>
  )
}

function StagesControls({
  stagesControls,
  dispatch,
}: {
  stagesControls: Api.Settings.StagesControls
  dispatch: StagesControlsDispatch
}) {
  return (
    <div className={'px-2'}>
      <h2 className={'text-3xl mb-4'}>{stagesControls.title}</h2>
      {stagesControls.description && (
        <p className={'mb-6'}>{stagesControls.description}</p>
      )}

      <div className={'max-w-xl mx-auto'}>
        <StagesEditor onToggle={dispatch} stages={stagesControls.items} />
      </div>
    </div>
  )
}
