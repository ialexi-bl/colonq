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
      <div>{summary}</div>
      <div
        className={'overflow-hidden duration-300'}
        ref={ref}
        style={{ height }}
      >
        {/* Padding is visible when open for height: 0 so emulating it with extra div */}
        <div className={'h-2'} />
        {details}
      </div>
    </div>
  )
}
