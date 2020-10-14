import { MixedDispatch } from './types'
import { store } from './store'

export default class StoreController {
  protected get dispatch() {
    return store.dispatch as MixedDispatch
  }
}
