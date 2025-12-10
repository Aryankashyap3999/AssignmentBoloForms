import './FieldBox.css';
import { useRef } from 'react';

export const FieldBox = ({ field, isSelected, onSelect, onDragMove, onResize, children }) => {
  const dragStartPos = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.field-box-resize')) {
      return;
    }
    
    e.stopPropagation();
    e.preventDefault();
    
    onSelect?.(field.id);
    
    dragStartPos.current = {
      startX: e.clientX,
      startY: e.clientY,
      fieldX: field.x,
      fieldY: field.y,
    };

    const handleMouseMove = (moveEvent) => {
      if (!dragStartPos.current) return;

      const deltaX = moveEvent.clientX - dragStartPos.current.startX;
      const deltaY = moveEvent.clientY - dragStartPos.current.startY;

      const newX = dragStartPos.current.fieldX + deltaX;
      const newY = dragStartPos.current.fieldY + deltaY;

      onDragMove?.(newX, newY, field.id);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      dragStartPos.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`field-box ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${field.x}px`,
        top: `${field.y}px`,
        width: `${field.width}px`,
        height: `${field.height}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
      {isSelected && <div className="field-box-resize" onMouseDown={onResize} />}
    </div>
  );
};
