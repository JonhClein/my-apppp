import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Definimos el tipo de los elementos arrastrables
const ItemTypes = 'div';

// Definimos la interfaz para los props del div arrastrable
interface DraggableDivProps {
  color: string;
  id: number;
}

// Componente de un div arrastrable
const DraggableDiv: React.FC<DraggableDivProps> = ({ color, id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      Arrástrame
    </div>
  );
};

// Componente que contiene los divs y maneja el drop
const DivContainer: React.FC<{ id: number }> = ({ id }) => {
  const [droppedItem, setDroppedItem] = useState<number | null>(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes,
    drop: (item: any) => {
      if (item.id === id) {
        console.log(`Soltaste el div con ID ${id}`);
        setDroppedItem(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        height: '200px',
        border: '2px dashed black',
        padding: '20px',
        position: 'relative',
      }}
    >
      {isActive ? 'Suelta aquí' : 'Arrastra aquí'}
      {droppedItem === id && <DraggableDiv color="black" id={id} />} {/* Renderizamos el div arrastrable si se soltó en este contenedor */}
    </div>
  );
};

// Componente principal
const Prueba: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DraggableDiv color="red" id={1} />
        <DraggableDiv color="blue" id={2} />
        <DraggableDiv color="green" id={3} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <DivContainer id={1} />
        <DivContainer id={2} />
        <DivContainer id={3} />
      </div>
    </DndProvider>
  );
};

export default Prueba;

