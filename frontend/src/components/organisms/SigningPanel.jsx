import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { useState } from 'react';
import './SigningPanel.css';
import { validateEmail } from '../../utils/commonUtils';

export const SigningPanel = ({ onSign, isLoading }) => {
  const [email, setEmail] = useState('');
  const [signatureFile, setSignatureFile] = useState(null);

  const handleSign = () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!signatureFile) {
      alert('Please upload a signature image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onSign?.({
        email,
        signatureBase64: e.target.result,
      });
    };
    reader.readAsDataURL(signatureFile);
  };

  return (
    <div className="signing-panel">
      <h3>Sign Document</h3>
      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="form-field">
        <label htmlFor="signature" className="label">
          Signature Image
        </label>
        <input
          id="signature"
          type="file"
          accept="image/*"
          onChange={(e) => setSignatureFile(e.target.files?.[0])}
          className="input"
        />
      </div>
      <Button onClick={handleSign} disabled={isLoading} variant="primary">
        {isLoading ? 'Signing...' : 'Sign PDF'}
      </Button>
    </div>
  );
};
