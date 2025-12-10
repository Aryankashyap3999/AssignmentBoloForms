import { FieldBox } from '../atoms/FieldBox';
import './TextField.css';

export const TextField = ({ field, isSelected, onSelect, onDragStart, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragStart={onDragStart} onResize={onResize}>
      <div className="text-field">
        <span className="field-label">Text</span>
        <p className="field-value">{field.value || 'Click to edit'}</p>
      </div>
    </FieldBox>
  );
};
