import { ThunkAction } from 'store/types'
import { hideLoading, notifyError } from '.'
import { unauthenticate } from 'store/auth'
import ApiClient from 'services/client'
import LangErrors from 'lang/errors.json'

export default function initApp(
  check?: string | null,
): ThunkAction<Promise<void>> {
  return async (dispatch) => {
    if (check) {
      ApiClient.check = check
    }

    try {
      await ApiClient.init()
    } catch (e) {
      if (e.name === 'NoStorageError') {
        dispatch(notifyError(LangErrors.noStorage))
      } else {
        dispatch(notifyError(LangErrors.network))
      }

      dispatch(unauthenticate())
    }

    dispatch(hideLoading('Initialization'))
  }
}
