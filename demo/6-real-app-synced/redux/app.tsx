import * as React from 'react';
import { useState, Dispatch } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { ItemData } from '../types';
import { MyReduxState, MyReduxAction } from './store';
import { ReduxTriggers } from '../syncing/redux-triggers';

// * ------------------------------------------------

const getReorderItems = (list: ItemData[], start: number, end: number) => {
  const result = [...list];
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
};

// * ------------------------------------------------

const Item: React.FC<{ data: ItemData; index: number }> = ({ data, index }) => (
  <Draggable draggableId={data.id} index={index}>
    {(provided) => (
      <div
        className="sidebar-item"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {`[${data.type}] id:${data.id}`}
      </div>
    )}
  </Draggable>
);

// * ------------------------------------------------

export const App: React.FC = () => {
  const items = useSelector<MyReduxState, ItemData[]>((s) => s.items);
  const dispatch = useDispatch<Dispatch<MyReduxAction>>();

  const onDragEnd = (result: DropResult) => {
    const { destination: dest, source } = result;
    if (!dest || dest.index === source.index) return;
    const nextItems = getReorderItems(items, source.index, dest.index);

    // dispatch({ type: 'force', items: nextItems });

    // * 将直接数据变更，改向 stream
    ReduxTriggers.reorder$.next(nextItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef}>
            {items.map((e, i) => (
              <Item data={e} index={i} key={e.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
