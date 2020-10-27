import { AppState, MixedDispatch } from './types'
import { store } from './store'

export default class StoreConsumer {
  protected get dispatch() {
    return store.dispatch as MixedDispatch
  }

  protected selector<T>(selector: (state: AppState) => T) {
    return selector(store.getState())
  }
}
