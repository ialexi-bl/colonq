import { useState } from 'react'
import useDifferentPrevious from 'hooks/use-different-previous'

export default function useTwoLatestDisplayControls<T>(item: T) {
  const previous = useDifferentPrevious<T | null>(item)
  const previous1 = useDifferentPrevious<T | null>(previous)
}
