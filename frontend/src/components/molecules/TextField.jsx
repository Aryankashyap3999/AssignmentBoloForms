import { FieldBox } from '../atoms/FieldBox';
import './TextField.css';

export const TextField = ({ field, isSelected, onSelect, onDragMove, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragMove={onDragMove} onResize={onResize}>
      <div className="text-field" style={{ pointerEvents: 'none' }}>
        <span className="field-label">Text</span>
        <p className="field-value">{field.value || 'Click to edit'}</p>
      </div>
    </FieldBox>
  );
};
