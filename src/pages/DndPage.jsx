import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../index.css'

function DndPage() {
  const [columns, setColumns] = useState({
    todo: { name: 'To Do', items: [{ id: '1', content: 'Buy groceries' }, { id: '2', content: 'Read a book' }, { id: '3', content: 'Bye something' }, { id: '4', content: 'Do something' }] },
    inProgress: { name: 'In Progress', items: [] },
    done: { name: 'Done', items: [] },
    blocked: { name: 'Blocked', items: [] },
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: { ...sourceColumn, items: sourceItems } });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems }
      });
    }
  };

  const deleteTask = (columnId, itemId) => {
    const newItems = columns[columnId].items.filter(item => item.id !== itemId);
    setColumns({ ...columns, [columnId]: { ...columns[columnId], items: newItems } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} style={{ margin: '0 20px' }}>
            <h2>{column.name}</h2>
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                    padding: 4,
                    width: 250,
                    minHeight: 500,
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent :'space-between',
                            alignContent: 'center',
                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style,
                          }}
                        >
                        <span  style={{alignContent:'center'}}>
                          {item.content}
                        </span>
                          <button onClick={() => deleteTask(columnId, item.id)}>Удалить</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default DndPage;
