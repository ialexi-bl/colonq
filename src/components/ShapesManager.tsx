import { AppState } from 'store/types'
import { ShapeSet } from 'store/shapes'
import { useSelector } from 'react-redux'
import React from 'react'

export default function ShapesManager() {
  const shapes = useSelector((state: AppState) => state.shapes)

  return (
    <svg className={'absolute h-0 w-0'}>
      <defs>
        {shapes.map(({ name, shapes: paths }) => (
          <ClipPath key={name} name={name} shapes={paths} />
        ))}
      </defs>
    </svg>
  )
}

function ClipPath({ name, shapes }: ShapeSet) {
  if (shapes.length === 1) {
    return (
      <clipPath
        id={`shape-${name}-${shapes[0].name}`}
        clipPathUnits={'objectBoundingBox'}
      >
        <path d={shapes[0].shape} />
      </clipPath>
    )
  }
  console.log(name, shapes)

  return (
    <>
      {shapes.map(({ name: shapeName, shape }) => (
        <clipPath
          id={`shape-${name}-${shapeName}`}
          key={shapeName}
          clipPathUnits={'objectBoundingBox'}
        >
          <path d={shape} />
        </clipPath>
      ))}
    </>
  )
}
