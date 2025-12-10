import { FieldBox } from '../atoms/FieldBox';
import './RadioField.css';

export const RadioField = ({ field, isSelected, onSelect, onDragMove, onResize }) => {
  const options = field.options || ['Option 1', 'Option 2'];

  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragMove={onDragMove} onResize={onResize}>
      <div className="radio-field" style={{ pointerEvents: 'none' }}>
        <span className="field-label">Radio</span>
        <div className="radio-options">
          {options.map((option, idx) => (
            <label key={idx} className="radio-option" style={{ pointerEvents: 'auto' }}>
              <input type="radio" name={field.id} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </FieldBox>
  );
};
