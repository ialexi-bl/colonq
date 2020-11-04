import { closeLoading, openLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export type SuspenseLoadingProps = {
  id: string
}

export default function SuspenseLoading({ id }: SuspenseLoadingProps) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(openLoading(id))
    return () => {
      dispatch(closeLoading(id))
    }
  }, [dispatch, id])

  return null
}
