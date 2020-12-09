import { VirtualizedGroupProps, VirtualizedItemProps } from './types'
import ControlledScrollbars from '../ControlledScrollbars'
import React from 'react'
import VirtualizedList from './VirtualizedList'
import cn from 'clsx'

const data = [...new Array(20)].map((_, i) => {
  return {
    label: i,
    items: [...new Array(20)].map((_, i) => ({ label: i })),
  }
})
type Data = typeof data

const getCount = (data: Data, groupIndex: number) => {
  return groupIndex < 0 ? data.length : data[groupIndex].items.length
}

export default function VirtualizedListFixture() {
  return (
    <ControlledScrollbars>
      <Styles />
      <div style={{ padding: '2rem', width: '100%', height: '100%' }}>
        <VirtualizedList
          getCount={getCount}
          itemsHeight={60}
          group={Group}
          item={Item}
          data={data}
        />
      </div>
    </ControlledScrollbars>
  )
}

function Group({
  elementRef,
  toggleFold,
  groupIndex,
  transform,
  className,
  expanded,
  data,
}: VirtualizedGroupProps<Data, any>) {
  const group = data[groupIndex]

  return (
    <div
      className={cn('Group', className)}
      style={{ transform }}
      ref={elementRef}
    >
      {group.label}
    </div>
  )
}

function Item({
  elementRef,
  groupIndex,
  collapsing,
  className,
  itemIndex,
  transform,
  expanding,
  data,
}: VirtualizedItemProps<Data, any>) {
  const item = data[groupIndex].items[itemIndex]

  return (
    <div
      className={cn('View', className)}
      style={{ transform }}
      ref={elementRef}
    >
      <div
        style={{
          animationDuration: collapsing
            ? `${Math.max(400 - 30 * itemIndex, 0)}ms`
            : `${300 + 50 * itemIndex}ms`,
        }}
        className={cn('Item', {
          collapsing,
          expanding,
        })}
      >
        {item.label}
      </div>
    </div>
  )
}

const Styles = () => (
  <style>{`
    @keyframes view-appear {
      from {
        opacity: 0;
        transform: translate(5rem);
      }
      to {
        opacity: 1;
        transform: translate(0rem);
      }
    }
    @keyframes view-disappear {
      from {
        opacity: 1;
        transform: translate(0rem);
      }
      to {
        opacity: 0;
        transform: translate(5rem);
      }
    }

    .Group, .View {
      color: #ddd;
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      transition: 500ms transform;
    }
    .Group, .Item {
      border-radius: .5rem;
      background: indigo;
    }
    .Item {
      width: 100%;
      height: 100%;
    }
    .collapsing {
      animation: view-disappear 300ms ease-in-out forwards;
    }
    .expanding {
      animation: view-appear 500ms ease-in-out;
    }
    .UnfoldButton {
      marginLeft: auto;
    }
  `}</style>
)
