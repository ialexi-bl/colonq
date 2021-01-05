import { memo } from 'react'
import Accordion from '../Accordion'
import Expand from 'components/icons/Expand'
import Trapezoid from '../Trapezoid'
import cn from 'clsx'
import useToggle from 'hooks/use-toggle'

type OnToggle = (data: { group: string; item: string }) => unknown
export type ToggleListProps = {
  data: ToggleListGroup[]
  onToggle: OnToggle
}
export type ToggleListGroup = {
  id: string
  label: string
  items: ToggleListItem[]
  value?: boolean
  disabled?: boolean
}
export type ToggleListItem = {
  id: string
  label: string
  value?: boolean
}

export default function ToggleList({ data, onToggle }: ToggleListProps) {
  return (
    <div>
      {data.map((group, i) => (
        <Group i={i} key={group.id} group={group} onToggle={onToggle} />
      ))}
    </div>
  )
}

const Group = memo(function Group({
  i,
  group,
  onToggle,
}: {
  i: number
  group: ToggleListGroup
  onToggle: OnToggle
}) {
  const [expanded, toggle] = useToggle()

  return (
    <Accordion
      className={'mb-2'}
      expanded={expanded}
      summary={
        <Trapezoid
          variant={((i % 6) + 1) as any}
          className={cn(
            'flex px-6 py-4 items-center',
            group.disabled ? 'bg-disabled-1000' : 'bg-secondary-400',
          )}
        >
          <span className={'flex-1'}>{group.label}</span>
          {!group.disabled && (
            <Expand
              className={cn(
                'w-6 transform duration-200',
                expanded && 'rotate-180',
              )}
              onClick={toggle}
            />
          )}
        </Trapezoid>
      }
      details={
        <div className={'flex flex-wrap pl-4'}>
          {group.items.map((item, j) => (
            <Item
              i={j}
              key={item.id}
              item={item}
              groupId={group.id}
              onToggle={onToggle}
            />
          ))}
        </div>
      }
    />
  )
})
const Item = memo(function Item({
  i,
  item,
  groupId,
  onToggle,
}: {
  i: number
  item: ToggleListItem
  groupId: string
  onToggle: OnToggle
}) {
  return (
    <Trapezoid
      variant={((i % 6) + 1) as any}
      onClick={() => onToggle({ group: groupId, item: item.id })}
      className={cn(
        'px-4 py-2 m-1 flex-auto transition-color duration-100 cursor-pointer',
        item.value ? 'bg-primary-700' : 'bg-disabled-1000',
      )}
    >
      {item.label}
    </Trapezoid>
  )
})
