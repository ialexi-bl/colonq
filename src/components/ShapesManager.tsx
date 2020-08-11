import { AppState } from 'store/types'
import { useSelector } from 'react-redux'
import React, { ComponentType, Suspense, lazy } from 'react'

export default function ShapesManager() {
  const names = useSelector((state: AppState) => state.shapes)

  names.forEach((name) => {
    if (!(name in cache)) {
      cache[name] = lazy(() =>
        import(`shapes/${name}.shape.svg`).then(({ default: paths }) => ({
          default: getComponent(name, paths),
        })),
      )
    }
  })

  return (
    <Suspense fallback={null}>
      <svg className={'absolute h-0 w-0'}>
        <defs>
          {names.map((name) => {
            const ShapesSet = cache[name]
            return <ShapesSet key={name} />
          })}
        </defs>
      </svg>
    </Suspense>
  )
}

const cache: Record<string, ComponentType> = {}
const getComponent = (name: string, paths: string[]) => () => {
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
