/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="gtag.js" />
/// <reference types="yandex-metrika-tag" />

declare var gtag: Gtag.Gtag

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare namespace HTMLProps {
  type className = { className?: string }
  type children = { children?: React.ReactNode }
  type heading = React.HTMLAttributes<HTMLHeadingElement>
  type button = React.ButtonHTMLAttributes<HTMLButtonElement>
  type input = React.InputHTMLAttributes<HTMLInputElement>
  type div = React.HTMLAttributes<HTMLDivElement>
  type svg = React.SVGAttributes<SVGSVGElement>
  type img = React.ImgHTMLAttributes<HTMLImageElement>
  type a = React.AnchorHTMLAttributes<HTMLAnchorElement>
}
type Childfree<T> = Omit<T, 'children'>

interface Response {
  _req: Request
  _opts: import('ky').Options
}

interface Window {
  TREE_MOUNTED: boolean
}

declare module 'clsx' {
  type ClassName =
    | null
    | false
    | number
    | string
    | undefined
    | { [key: string]: any }
    | ClassName[]
  export default function cn(...classNames: ClassName[])
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}
