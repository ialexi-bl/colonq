import { Api } from 'core/api/config'
import { memo } from 'react'
import Accordion from '../Accordion'
import Expand from 'components/icons/Expand'
import Trapezoid from '../Trapezoid'
import cn from 'clsx'
import useToggle from 'hooks/use-toggle'

type OnToggle = (data: {
  problem: string
  stage: string
  set: string
}) => unknown
export type StagesEditorProps = {
  stages: Api.Settings.Stage[]
  onToggle: OnToggle
}

export default function StagesEditor({ stages, onToggle }: StagesEditorProps) {
  return (
    <div>
      {stages.map((stage) => (
        <div className={'mb-6'} key={stage.id}>
          <h3 className={'text-2xl mb-4'}>{stage.label}</h3>
          {!stage.unlocked ? (
            <span className={'text-disabled-100'}>Заблокировано</span>
          ) : (
            stage.sets.map((set, i) => (
              <StageSet
                i={i}
                set={set}
                key={set.id}
                stageId={stage.id}
                onToggle={onToggle}
              />
            ))
          )}
        </div>
      ))}
    </div>
  )
}

const StageSet = memo(function Group({
  i,
  set,
  stageId,
  onToggle,
}: {
  i: number
  set: Api.Settings.StageSet
  stageId: string
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
          className={'flex px-6 py-4 items-center bg-secondary-400'}
        >
          <span className={'flex-1'}>{set.label}</span>

          <button
            onClick={toggle}
            className={cn(
              'w-6 transform duration-200 cursor-pointer',
              'focus:text-gray-500',
              expanded && 'rotate-180',
            )}
          >
            <Expand className={'w-full'} />
          </button>
        </Trapezoid>
      }
      details={
        <div className={'flex flex-wrap pl-4'}>
          {set.problems.map((problem, j) => (
            <StageProblem
              i={j}
              key={problem.id}
              item={problem}
              setId={set.id}
              stageId={stageId}
              onToggle={onToggle}
            />
          ))}
        </div>
      }
    />
  )
})
const StageProblem = memo(function Item({
  i,
  item,
  setId,
  stageId,
  onToggle,
}: {
  i: number
  item: Api.Settings.StageProblem
  setId: string
  stageId: string
  onToggle: OnToggle
}) {
  return (
    <Trapezoid
      variant={((i % 6) + 1) as any}
      onClick={() => onToggle({ problem: item.id, stage: stageId, set: setId })}
      className={cn(
        'px-4 py-2 m-1 flex-auto transition-color duration-100 cursor-pointer',
        item.enabled ? 'bg-primary-700' : 'bg-disabled-1000',
      )}
    >
      {item.label}
    </Trapezoid>
  )
})
