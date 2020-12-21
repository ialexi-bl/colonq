import { Link } from 'react-router-dom'

export type TextWithLinksProps = {
  className?: string
  children: string
}

/**
 * Renders text and replaces markdown style links
 * with real links
 * @param props
 */
export default function TextWithLinks({
  className,
  children,
}: TextWithLinksProps) {
  return <p className={className}>{renderText(children)}</p>
}

function renderText(text: string) {
  const parts = text.split(/\[([^\]]+\]\([^)]+)\)/)

  return (
    <>
      {parts.map((part, i) => {
        if (!(i & 1)) return part
        const [name, path] = part.split('](')
        return (
          <Link
            className={
              'active:text-blue-400 hover:text-blue-300 text-blue-200 duration-100 underline'
            }
            key={i}
            to={path}
          >
            {name}
          </Link>
        )
      })}
    </>
  )
}
