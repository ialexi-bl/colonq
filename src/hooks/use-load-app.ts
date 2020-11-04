import { App, loadApp } from 'store/user'
import { AppState } from 'store/types'
import { closeLoading, openLoading } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function useLoadApp(id: string) {
  const dispatch = useDispatch()
  const app = useSelector<AppState, App | undefined>((app) => app.user.apps[id])

  useEffect(() => {
    dispatch(openLoading(`load/${id}`))
    dispatch(loadApp(id))
  }, [id, dispatch])
  useEffect(() => {
    if (['loaded', 'error'].includes(app?.status as string)) {
      dispatch(closeLoading(`load/${id}`))
    }
  }, [app, dispatch, id])

  return !app || app.status === 'only-info' ? 'loading' : app.status
}
