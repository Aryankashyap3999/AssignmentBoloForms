import { Button } from '../atoms/Button';
import './FieldToolbar.css';
import { useEditorStore } from '../../store/editorStore';
import { generateId } from '../../utils/commonUtils';

export const FieldToolbar = ({ onAddField }) => {
  const addField = (type) => {
    const fieldId = generateId();
    const newField = {
      id: fieldId,
      type,
      x: 50,
      y: 50,
      width: 120,
      height: 40,
      value: '',
      pageNumber: 1,
    };
    onAddField?.(newField);
  };

  return (
    <div className="field-toolbar">
      <div className="toolbar-group">
        <span className="toolbar-title">Add Fields</span>
        <Button onClick={() => addField('text')} variant="secondary">
          + Text
        </Button>
        <Button onClick={() => addField('signature')} variant="secondary">
          + Signature
        </Button>
        <Button onClick={() => addField('date')} variant="secondary">
          + Date
        </Button>
        <Button onClick={() => addField('radio')} variant="secondary">
          + Radio
        </Button>
      </div>
    </div>
  );
};
