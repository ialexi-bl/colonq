import cn from 'clsx'
import shapes from './trapezoid.shape.svg'
import useClipShape from 'hooks/use-clip-shape'

export type TrapezoidProps = HTMLProps.div & {
  variant?: 1 | 2 | 3 | 4 | 5 | 6
}

const Trapezoid = ({ className, variant, ...props }: TrapezoidProps) => (
  useClipShape('trapezoid', shapes),
  (<div className={cn(className, `shape-trapezoid-${variant}`)} {...props} />)
)
export default Trapezoid
