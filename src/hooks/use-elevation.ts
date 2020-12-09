import { AppState } from 'store/types'
import { setElevation } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import cn from 'clsx'

// TODO: add in documentation that this **must** be called once per route
export default function useElevation(elevation: number) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setElevation({ value: elevation }))
  }, [dispatch, elevation])

  return useSelector((state: AppState) => state.view.previousElevation)
}

const getCnHook = (compare: (other: number, curr: number) => boolean) => {
  return function useElevationCn(
    elevation: number,
    enterCn: string = 'route-enter-overlay',
    exitCn: string = 'route-exit-overlay',
  ) {
    const id = useRef(Math.random())
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(setElevation({ value: elevation, id: id.current }))
    }, [dispatch, elevation])

    const el = useSelector((state: AppState) => state.view)

    return cn(
      el.previousElevation.value === Infinity && enterCn,
      el.previousElevation.id !== id.current &&
        compare(el.previousElevation.value, elevation) &&
        enterCn,
      compare(el.currentElevation.value, elevation) && exitCn,
    )
  }
}

export const useAboveElevationClassnames = getCnHook((a, b) => a < b)
export const useBelowElevationClassnames = getCnHook((a, b) => a > b)
export const useSameElevationClassnames = getCnHook((a, b) => a === b)

export type RouteTransitionClassName =
  | 'overlay'
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'opacity'
  | ''
export type ElevationClassNames = {
  above?: RouteTransitionClassName
  below?: RouteTransitionClassName
  same?: RouteTransitionClassName
}
export function useElevationClassnames(
  elevation: number,
  cns: ElevationClassNames,
) {
  const id = useRef(Math.random())
  const dispatch = useDispatch()
  const el = useSelector((state: AppState) => state.view)
  /** Position of page relative to previous pages */
  const enterPos = useRef(compare(el.currentElevation.value, elevation))

  useEffect(() => {
    dispatch(setElevation({ value: elevation, id: id.current }))
  }, [dispatch, elevation])

  return el.previousElevation.value === Infinity
    ? ''
    : cn(
        enterPos.current in cns && `route-enter-${cns[enterPos.current]}`,
        el.currentElevation.value < elevation
          ? cns.above && `route-exit-${cns.above}`
          : el.currentElevation.value > elevation
          ? cns.below && `route-exit-${cns.below}`
          : cns.same && `route-exit-${cns.same}`,
      )
}

const compare = (a: number, b: number): keyof ElevationClassNames =>
  a < b ? 'above' : a === b ? 'same' : 'below'
