import { AppState } from 'store/types'
import { setElevation } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import cn from 'clsx'

export default function useElevation(elevation: number) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setElevation(elevation))
  }, [dispatch, elevation])

  return useSelector((state: AppState) => state.view.previousElevation)
}

export function useElevationClassnames(
  elevation: number,
  enterCn: string = 'route-enter-overlay',
  exitCn: string = 'route-exit-overlay',
) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setElevation(elevation))
  }, [dispatch, elevation])

  const el = useSelector((state: AppState) => state.view)
  return cn(
    el.previousElevation < elevation && enterCn,
    el.currentElevation < elevation && exitCn,
  )
}
