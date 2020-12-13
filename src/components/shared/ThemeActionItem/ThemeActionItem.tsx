import Accordion from '../Accordion'
import Button from '../Button'
import DynamicIcon from 'components/icons/DynamicIcon'
import ThemeCard from '../ThemeCard'

export type ActionDescription = {
  id: string | number
  label: string
  action: () => unknown
  primary?: boolean
}
export type ThemeActionItemProps = {
  i?: number
  icon: string
  title: string
  actions: ActionDescription[]
  expanded?: boolean
  progress?: number
  disabled?: boolean
  className?: string
  toggleVisible?: () => unknown
}

const ThemeActionItem = ({
  i = 0,
  icon,
  title,
  actions,
  disabled,
  expanded,
  progress,
  className,
  toggleVisible,
}: ThemeActionItemProps) => (
  <Accordion
    className={className}
    expanded={expanded}
    summary={
      <ThemeCard
        onClick={toggleVisible}
        progress={progress}
        disabled={disabled}
        className={'cursor-pointer'}
        variant={((i % 4) + 1) as 1}
        title={title}
        icon={<DynamicIcon icon={icon} />}
      />
    }
    details={
      <div className={'flex flex-col px-6'}>
        {actions.map(({ label, action, primary, id }, j) => (
          <Button
            key={id}
            variant={(((i + j) % 3) + 1) as 1}
            onClick={action}
            secondary={!primary}
          >
            {label}
          </Button>
        ))}
      </div>
    }
  />
)
export default ThemeActionItem
