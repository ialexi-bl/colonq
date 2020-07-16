import {
  CLOSE_NAVIGATION,
  CLOSE_NOTIFICATION,
  FORCE_LOADING,
  HIDE_NON_ROUTER_LOADING,
  OPEN_NAVIGATION,
  OPEN_NOTIFICATION,
  SET_LOADING,
  TOGGLE_NAV,
  ViewAction,
  ViewState,
} from './types'

const hash = (str: string) => {
  let hash = 0
  for (let i = 0, s = str.length; i < s; i++) {
    const char = str.charCodeAt(i)
    hash = hash * 31 + char
    hash = hash & hash
  }
  return hash
}

const initialState: ViewState = {
  // Needed for `App` to check authentication
  // Disabled on load
  loading: ['App'],
  navigationVisible: true,
  notification: null,
  navOpen: false,
}

export function reducer(state = initialState, action: ViewAction): ViewState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.state
          ? state.loading.concat(action.payload.id)
          : state.loading.filter((id) => id !== action.payload.id),
      }
    case FORCE_LOADING:
      return {
        ...state,
        loading: [action.payload.id],
      }
    case HIDE_NON_ROUTER_LOADING:
      return {
        ...state,
        loading: state.loading.filter((x) => x === 'Router' || x === 'App'),
      }
    case TOGGLE_NAV:
      return {
        ...state,
        navOpen: action.payload.state,
      }
    case OPEN_NAVIGATION:
      return {
        ...state,
        navigationVisible: true,
      }
    case CLOSE_NAVIGATION:
      return {
        ...state,
        navigationVisible: false,
      }
    case OPEN_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...action.payload,
          hash: hash(action.payload.text),
        },
      }
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notification: null,
      }
    default:
      return state
  }
}
