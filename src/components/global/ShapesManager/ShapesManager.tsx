import { AppState } from 'store/types'
import { useSelector } from 'react-redux'

export default function ShapesManager() {
  const shapes = useSelector((state: AppState) => state.shapes)

  return (
    <div id={'shape-manager'}>
      <style>
        {shapes.map(({ name }) => `.${name} { clip-path: url(#${name}) }`)}
      </style>
      <svg className={'absolute h-0 w-0'}>
        <defs>
          {shapes.map(({ name, shape }) => (
            <ClipPath key={name} name={name} path={shape} />
          ))}
        </defs>
      </svg>
    </div>
  )
}

function ClipPath({ name, path }: { name: string; path: string }) {
  // if (shapes.length === 1) {
  // const shapeName = shape.name
  return (
    <clipPath id={name} clipPathUnits={'objectBoundingBox'}>
      <path d={path} />
    </clipPath>
  )
  // }

  // return (
  //   <>
  //     {shapes.map(({ name: shapeName, shape }) => (
  //       <clipPath
  //         id={`shape-${name}${shapeName && '-' + shapeName}`}
  //         key={shapeName}
  //         clipPathUnits={'objectBoundingBox'}
  //       >
  //         <path d={shape} />
  //       </clipPath>
  //     ))}
  //   </>
  // )
}
