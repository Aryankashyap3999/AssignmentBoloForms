import { FieldBox } from '../atoms/FieldBox';
import './SignatureField.css';

export const SignatureField = ({ field, isSelected, onSelect, onDragMove, onResize }) => {
  return (
    <FieldBox field={field} isSelected={isSelected} onSelect={onSelect} onDragMove={onDragMove} onResize={onResize}>
      <div className="signature-field" style={{ pointerEvents: 'none' }}>
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
