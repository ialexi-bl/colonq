import { AppState } from 'store/types'
import { setElevation } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import cn from 'clsx'

/**
 * Sets current route elevation to manage which route
 * should be above which one and set corresponding animations
 * NOTE: this **must** only be called once per route, otherwise
 * transitions will be messed up
 * @param elevation
 */
export default function useElevation(elevation: number): void {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setElevation({ value: elevation }))
  }, [dispatch, elevation])
}

export type RouteTransitionClassName =
  | 'overlay'
  | 'opacity'
  | 'right'
  | 'left'
  | 'down'
  | 'up'
  | ''
export type ElevationClassNames = {
  above?: RouteTransitionClassName
  below?: RouteTransitionClassName
  same?: RouteTransitionClassName
}

/**
 * Sets route elevation to manage which route
 * should be above which one and provides different
 * classnames depending on relative position of two routes
 *
 * NOTE: this **must** only be called once per route, otherwise
 * transitions will be messed up. Also `useElevation` must not
 * be called if this hook is used
 * @param elevation
 * @param cns - List of classNames
 */
export function useElevationClassnames(
  elevation: number,
  cns: ElevationClassNames,
): string {
  const dispatch = useDispatch()
  /**
   * Unique ID used to manage class names for the same route
   * rendered consequently with different parameters
   */
  const id = useRef(Math.random())
  /** @name elevation */
  const el = useSelector((state: AppState) => state.view)
  /** Position of page relative to previous pages */
  const enterPos = useRef(compare(el.currentElevation.value, elevation))

  useEffect(() => {
    dispatch(setElevation({ value: elevation, id: id.current }))
  }, [dispatch, elevation])

  return el.previousElevation.value === Infinity
    ? // Prevent any animation on first render
      ''
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
