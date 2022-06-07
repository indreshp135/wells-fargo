/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// fake data generator for now
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `${k}`,
  content: `item ${k}`
}));

// Reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  borderRadius: '5px',

  ...draggableStyle
});

const getListStyle = () => ({
  background: 'lightblue',
  padding: grid
});

export function Rearranger() {
  const [items, setItems] = useState(getItems(100));
  const history = useHistory();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsReordered = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    // Call to backend later
    setItems(
      itemsReordered
    );
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    // Call to backend later
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(_provided, _snapshot) => (
                  <div
                    ref={_provided.innerRef}
                    {..._provided.draggableProps}
                    {..._provided.dragHandleProps}
                    style={getItemStyle(
                      _snapshot.isDragging,
                      _provided.draggableProps.style
                    )}
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {item.content}
                      </span>
                      <div>
                        <Button className="mx-2" variant="outline-warning" onClick={() => history.push(`update/${item.id}`)}>
                          Update
                        </Button>
                        <Button className="mx-2" variant="outline-danger" onClick={() => deleteItem(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                          Delete
                        </Button>
                      </div>
                    </div>

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
