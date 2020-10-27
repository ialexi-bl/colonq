import React, { useEffect, useRef, useState } from 'react'

export type AccordionProps = Childfree<HTMLProps.div> & {
  summary: React.ReactNode
  details: React.ReactNode
  expanded?: boolean
}
export default function Accordion({
  summary,
  details,
  expanded,
  ...props
}: AccordionProps) {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!expanded) {
      setHeight(0)
    } else {
      if (!ref.current) return
      setHeight(ref.current.scrollHeight)
    }
  }, [expanded])

  return (
    <div {...props}>
      <div className={'mb-4'}>{summary}</div>
      <div
        className={'overflow-hidden duration-300'}
        ref={ref}
        style={{ height }}
      >
        {details}
      </div>
    </div>
  )
}
