import { AppState } from 'store/types'
import { setElevation } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function useElevation(elevation: number) {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('setting', elevation)
    dispatch(setElevation(elevation))
  }, [dispatch, elevation])

  return useSelector((state: AppState) => state.view.previousElevation)
}
