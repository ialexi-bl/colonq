import { ReactNode } from 'react'
import Oval from '../Oval/Oval'
import cn from 'clsx'

export type LetterButtonProps = Childfree<HTMLProps.button> & {
  children?: ReactNode
  state?: 'correct' | 'incorrect' | 'invisible' | null
}

const LetterButton = ({ className, ...props }: LetterButtonProps) => {
  return (
    <Oval
      as={'button'}
      className={cn(className, 'uppercase duration-100 py-2 px-3')}
      {...props}
    />
  )
}
export default LetterButton
