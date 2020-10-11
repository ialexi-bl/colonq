import { AppState } from './types'
import { store } from './store'

export const connectStore = <T>(
  selector: (state: AppState) => T,
): PropertyDecorator => (obj, name) => {
  Object.defineProperty(obj, name, {
    get: () => selector(store.getState()),
    configurable: true,
    enumerable: true,
  })
}
export const connectStoreDispatch = (): PropertyDecorator => (obj, name) => {
  Object.defineProperty(obj, name, {
    get: () => store.dispatch,
    configurable: true,
    enumerable: true,
  })
}
