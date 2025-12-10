import './Input.css';

export const Input = ({ type = 'text', placeholder, value, onChange, disabled = false }) => {
  return (
    <input
      type={type}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
