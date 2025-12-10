import { FieldBox } from '../atoms/FieldBox';
import './SignatureField.css';

export const SignatureField = ({ field, isSelected, onSelect, onDragStart, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragStart={onDragStart} onResize={onResize}>
      <div className="signature-field">
        <span className="field-label">Signature</span>
        {field.image ? (
          <img src={field.image} alt="signature" className="signature-image" />
        ) : (
          <p className="placeholder">Drag signature here</p>
        )}
      </div>
    </FieldBox>
  );
};
