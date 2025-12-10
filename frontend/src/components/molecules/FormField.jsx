import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import './FormField.css';

export const FormField = ({ label, id, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="form-field">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};
