import { FieldBox } from '../atoms/FieldBox';
import './DateField.css';

export const DateField = ({ field, isSelected, onSelect, onDragMove, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragMove={onDragMove} onResize={onResize}>
      <div className="date-field" style={{ pointerEvents: 'none' }}>
        <span className="field-label">Date</span>
        <input
          type="date"
          className="date-input"
          value={field.value || ''}
          onChange={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          style={{ pointerEvents: 'auto' }}
        />
      </div>
    </FieldBox>
  );
};
