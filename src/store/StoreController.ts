import { UnauthenticatedError } from 'core/errors'
import { getStore } from './store'
import type { MixedDispatch } from './types'

/* 
Using getStore and not just store here to avoid problems with circular dependencies:
StoreController becomes undefined in many places because it uses store that is not returned from a function but initialized in-place
 */

function getUserId(): string | null {
  return getStore().getState().user.id
}
function requireUserId(): string {
  const id = getUserId()
  if (!id) throw new UnauthenticatedError('Чтобы это сделать, нужно войти')
  return id
}

const StoreController = {
  getUserId,
  requireUserId,
  get dispatch(): MixedDispatch {
    return getStore().dispatch
  },
  get getState(): ReturnType<typeof getStore>['getState'] {
    return getStore().getState
  },
}
export default StoreController
