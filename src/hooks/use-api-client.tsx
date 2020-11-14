import { ApiResponse } from 'services/api/config'
import { AppState } from 'store/types'
import { AuthorizedApiMethod, UnauthorizedApiMethod } from 'services/api/api'
import { authenticate } from 'store/user'
import { store } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useRef } from 'react'

export interface ExecuteMethod {
  <T>(method: UnauthorizedApiMethod<T>): Promise<ApiResponse.Success<T>>
}
export interface ExecuteMethodAuthorized {
  <T>(method: AuthorizedApiMethod<T>): Promise<ApiResponse.Success<T>>
}
export type ApiClient = {
  execute: ExecuteMethod
  executeAuthorized: ExecuteMethodAuthorized
}

type PendingRequest = {
  method: AuthorizedApiMethod<any>
  resolve: (data: any) => void
}
const execute: ExecuteMethod = <T extends any>(
  method: UnauthorizedApiMethod<T>,
) => method(store.dispatch)

export default function useApiClient(): ApiClient {
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user)
  const pending = useRef<PendingRequest[]>([])

  useEffect(() => {
    if (
      pending.current.length &&
      user.status !== 'loading' &&
      user.token &&
      user.tokenExpires - Date.now() > 500
    ) {
      pending.current.forEach(({ method, resolve }) => {
        method(user.token, user.id, store.dispatch).then(resolve)
      })
      pending.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.status])

  return {
    execute,
    executeAuthorized: useCallback<ExecuteMethodAuthorized>(
      <T extends any>(method: AuthorizedApiMethod<T>) => {
        if (
          user.status !== 'loading' &&
          user.token &&
          user.tokenExpires - Date.now() > 500
        ) {
          return method(user.token, user.id, store.dispatch)
        } else {
          dispatch(authenticate())
          return new Promise<ApiResponse.Success<T>>((resolve) => {
            pending.current.push({ method, resolve })
          })
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch, user],
    ),
  }
}

export type ApiClientProps = {
  execute: ExecuteMethod
  executeAuthorized: ExecuteMethodAuthorized
}
type WithoutExecute<T> = Omit<T, keyof ApiClientProps>

export function withApiClient<T extends ApiClientProps>(
  Component: React.ComponentType<T>,
): React.ComponentType<WithoutExecute<T>> {
  return (props: WithoutExecute<T>) => (
    <Component {...(props as any)} {...useApiClient()} />
  )
}
