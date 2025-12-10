import './FieldBox.css';

export const FieldBox = ({ field, isSelected, onSelect, onDragStart, onResize, children }) => {
  return (
    <div
      className={`field-box ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${field.x}px`,
        top: `${field.y}px`,
        width: `${field.width}px`,
        height: `${field.height}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(field.id);
      }}
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart?.(field.id);
      }}
    >
      {children}
      {isSelected && <div className="field-box-resize" onMouseDown={onResize} />}
    </div>
  );
};
