import { closeLoading, openLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useLoading(id: string, loading: boolean) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading) {
      dispatch(openLoading(id))
    } else {
      dispatch(closeLoading(id))
    }
  }, [dispatch, id, loading])
}
