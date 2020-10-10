import { AppState } from 'store/types'
import { Shape } from 'store/shapes'
import { useSelector } from 'react-redux'
import React from 'react'

export default function ShapesManager() {
  const shapes = useSelector((state: AppState) => state.shapes)

  return (
    <svg className={'absolute h-0 w-0'}>
      <defs>
        {shapes.map(({ name, paths }) => (
          <ClipPath key={name} name={name} paths={paths} />
        ))}
      </defs>
    </svg>
  )
}

function ClipPath({ name, paths }: Shape) {
  if (paths.length === 1) {
    return (
      <clipPath id={`shape-${name}`} clipPathUnits={'objectBoundingBox'}>
        <path d={paths[0]} />
      </clipPath>
    )
  }

  return (
    <>
      {paths.map((path, i) => (
        <clipPath
          id={`shape-${name}-${i + 1}`}
          key={`${name}-${i}`}
          clipPathUnits={'objectBoundingBox'}
        >
          <path d={path} />
        </clipPath>
      ))}
    </>
  )
}
