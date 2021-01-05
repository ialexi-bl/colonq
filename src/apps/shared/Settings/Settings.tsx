import { ApiResponse } from 'services/api/config'
import { LinkButton } from 'components/shared/Button'
import { MixedDispatch } from 'store/types'
import { app as appRoute } from 'config/routes'
import { executeAuthorizedMethod } from 'store/user'
import { notifyErrorObject } from 'store/view'
import { useDispatch } from 'react-redux'
import PageTitle from 'components/shared/PageTitle'
import SettingsApi from 'services/api/settings'
import ToggleList from 'components/shared/ToggleList'
import useAppTitle from 'hooks/use-app-title'
import useSave from 'hooks/use-save'
import useSettingsControls, {
  ToggleListDispatch,
} from './use-settings-controls'

export type SettingsViewProps = {
  app: string
  settings: ApiResponse.Settings.Get
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
      await dispatch(
        executeAuthorizedMethod(SettingsApi.changeSettings(app, modified!)),
      )
      resetModified()
    } catch (e) {
      return dispatch(notifyErrorObject(e))
    }
  })

  return (
    <div className={'container'}>
      <PageTitle>Найтройки приложения {title}</PageTitle>
      <div className={'flex'}>
        <section className={'flex-1 mx-auto max-w-2xl'}>
          <div className={'px-4'}>
            {settings.map((setting) => {
              switch (setting.type) {
                case 'list':
                  return (
                    <ListSetting
                      key={setting.id}
                      list={setting.data}
                      dispatch={setting.dispatch}
                    />
                  )
                default:
                  return null
              }
            })}
          </div>
        </section>
        <section
          className={'w-1/3 sticky top-0 hidden md:flex flex-col items-center'}
        >
          <LinkButton to={appRoute(app, 'practice')} className={'min-w-72'}>
            Начать занятие
          </LinkButton>
          <LinkButton
            to={appRoute(app, 'stats')}
            className={'min-w-72'}
            variant={2}
            secondary
          >
            Список уроков
          </LinkButton>
        </section>
      </div>
    </div>
  )
}

function ListSetting({
  list,
  dispatch,
}: {
  list: ApiResponse.Settings.ToggleList
  dispatch: ToggleListDispatch
}) {
  return (
    <div className={'px-2'}>
      <h2 className={'text-2xl mb-4'}>{list.title}</h2>
      {list.description && <p className={'mb-6'}>{list.description}</p>}

      <div className={'max-w-xl mx-auto'}>
        <ToggleList onToggle={dispatch} data={list.items} />
      </div>
    </div>
  )
}
