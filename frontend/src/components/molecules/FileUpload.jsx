import { Button } from '../atoms/Button';
import './FileUpload.css';
import { useRef } from 'react';

export const FileUpload = ({ onFileSelect, accept = '.pdf' }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect?.(file);
    }
  };

  return (
    <div className="file-upload">
      <input
        ref={inputRef}
        type="file"
        id="file-input"
        accept={accept}
        onChange={handleChange}
        className="file-input"
      />
      <Button onClick={handleClick} variant="primary">
        Choose PDF
      </Button>
    </div>
  );
};
