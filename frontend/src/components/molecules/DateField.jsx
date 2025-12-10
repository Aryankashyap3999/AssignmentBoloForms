import { FieldBox } from '../atoms/FieldBox';
import './DateField.css';

export const DateField = ({ field, isSelected, onSelect, onDragStart, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragStart={onDragStart} onResize={onResize}>
      <div className="date-field">
        <span className="field-label">Date</span>
        <input
          type="date"
          className="date-input"
          value={field.value || ''}
          onChange={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </FieldBox>
  );
};
