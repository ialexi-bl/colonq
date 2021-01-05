import cn from 'clsx'

export default function NumberIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const [, number] = name.split('/')
  return (
    <div
      className={cn(
        className,
        'text-7xl w-full h-full flex justify-center items-center pt-2',
      )}
      style={{ fontFamily: 'Neucha' }}
    >
      {number}
    </div>
  )
}
