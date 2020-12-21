import { AppState } from 'store/types'
import { UserApi } from 'services/api'
import { login, profile } from 'config/routes'
import { notifyErrorObject, notifyInfo } from 'store/view'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export default function ResendEmail() {
  const userStatus = useSelector((state: AppState) => state.user.status)
  const processed = useRef(false)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (processed.current || userStatus === 'loading') return
    processed.current = true

    if (userStatus === 'authenticated') {
      dispatch(replace(profile()))
      return
    }

    const query = new URLSearchParams(location.search)
    if (!query.has('id')) {
      dispatch(replace(login()))
    }

    const id = query.get('id')!
    UserApi.resendEmail(id)
      .then(
        () => {
          dispatch(notifyInfo('Письмо было отправлено заново, проверь почту'))
        },
        (e) => {
          dispatch(notifyErrorObject(e))
        },
      )
      .then(() => {
        dispatch(replace(login()))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus])

  return null
}
