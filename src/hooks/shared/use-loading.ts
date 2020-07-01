import { hideLoading, showLoading } from 'store/view'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function useLoading(id: string, loading: boolean) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading) {
      dispatch(showLoading(id))
    } else {
      dispatch(hideLoading(id))
    }
  }, [dispatch, id, loading])
}
