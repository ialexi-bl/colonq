import { ViewState } from './types'
import {
  closeLoading,
  closeNotification,
  closePageSpecificLoading,
  disableAnimations,
  enableAnimations,
  hideNavigation,
  notifyError,
  notifyInfo,
  openLoading,
  setElevation,
  showNavigation,
} from './actions'
import { createReducer } from 'store/util'
import Preferences from 'util/preferences'

const initialState: ViewState = {
  // Needed for `App` to check authentication
  // Disabled by app after the initialization is finished
  loading: ['init'],
  notification: null,
  navigationVisible: true,
  currentElevation: { value: Infinity, id: '' },
  previousElevation: { value: Infinity, id: '' },
  animationsEnabled: Preferences.animationsEnabled(),
}

export default createReducer<ViewState>(
  {
    [String(openLoading)]: (state, id: string) => ({
      ...state,
      loading: state.loading.concat(id),
    }),
    [String(closeLoading)]: (state, id: string) => ({
      ...state,
      loading: state.loading.filter((x) => x !== id),
    }),
    [String(closePageSpecificLoading)]: (state) => ({
      ...state,
      loading: state.loading.filter((x) => x in { router: 1, init: 1 }),
    }),

    [String(setElevation)]: (state, elevation) => {
      elevation.id ||= ''
      return {
        ...state,
        previousElevation: state.currentElevation,
        currentElevation: elevation,
      }
    },

    [String(showNavigation)]: (state) => ({
      ...state,
      navigationVisible: true,
    }),
    [String(hideNavigation)]: (state) => ({
      ...state,
      navigationVisible: false,
    }),

    [String(enableAnimations)]: (state) => ({
      ...state,
      animationsEnabled: true,
    }),
    [String(disableAnimations)]: (state) => ({
      ...state,
      animationsEnabled: false,
    }),

    [String(notifyInfo)]: (state, text: string) => ({
      ...state,
      notification: {
        type: 'info' as const,
        text,
      },
    }),
    [String(notifyError)]: (state, text: string) => ({
      ...state,
      notification: {
        type: 'error' as const,
        text,
      },
    }),
    [String(closeNotification)]: (state) => ({
      ...state,
      notification: null,
    }),
  },
  initialState,
)
