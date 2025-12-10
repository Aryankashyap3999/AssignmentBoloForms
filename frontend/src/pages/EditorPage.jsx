import { useState } from 'react';
import { FileUpload } from '../components/molecules/FileUpload';
import { PDFEditor } from '../components/organisms/PDFEditor';
import { FieldToolbar } from '../components/organisms/FieldToolbar';
import { SigningPanel } from '../components/organisms/SigningPanel';
import { useUploadDocument } from '../api/mutations/useDocumentMutations';
import { useSignDocument } from '../api/mutations/useSignedDocumentMutations';
import { useEditorStore } from '../store/editorStore';
import './EditorPage.css';

export const EditorPage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [signedPdfUrl, setSignedPdfUrl] = useState(null);
  const uploadMutation = useUploadDocument();
  const signMutation = useSignDocument();
  const fields = useEditorStore((state) => state.fields);
  const addField = useEditorStore((state) => state.addField);
  const setDocumentId = useEditorStore((state) => state.setDocumentId);
  const documentId = useEditorStore((state) => state.documentId);

  const handleFileSelect = async (file) => {
    if (!file) return;
    try {
      const result = await uploadMutation.mutateAsync(file);
      setDocumentId(result.data._id);
      setPdfUrl(URL.createObjectURL(file));
      setSignedPdfUrl(null); // Clear previous signed PDF
    } catch (error) {
      alert('Error uploading PDF: ' + error.message);
    }
  };

  const handleSign = async (signData) => {
    if (!documentId) {
      alert('Please upload a PDF first');
      return;
    }

    try {
      const payload = {
        originalDocumentId: documentId,
        signerEmail: signData.email,
        signatureBase64: signData.signatureBase64,
        signedPdfUrl: pdfUrl,
        signerIpAddress: window.location.hostname,
        signerDeviceInfo: navigator.userAgent,
        fields: fields.map((f) => ({
          id: f.id,
          type: f.type,
          coordinates: {
            x: f.x,
            y: f.y,
            width: f.width,
            height: f.height,
          },
        })),
      };

      const result = await signMutation.mutateAsync(payload);
      const signedUrl = result.data.signedPdfUrl;
      setSignedPdfUrl(signedUrl);
      
      alert('Document signed successfully!');
      console.log('Signed document:', result.data);
      console.log('Signed PDF URL:', signedUrl);
    } catch (error) {
      alert('Error signing document: ' + error.message);
      console.error('Signing error:', error);
    }
  };

  return (
    <div className="editor-page">
      <header className="editor-header">
        <h1>PDF Editor</h1>
        {signedPdfUrl && (
          <div style={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'center' 
          }}>
            <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✓ Signed</span>
            <a 
              href={signedPdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              download
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Download Signed PDF
            </a>
          </div>
        )}
      </header>

      <div className="editor-container">
        <aside className="editor-sidebar">
          <FileUpload onFileSelect={handleFileSelect} />
          <FieldToolbar onAddField={addField} />
          <SigningPanel onSign={handleSign} isLoading={signMutation.isPending} />
        </aside>

        <main className="editor-main">
          <PDFEditor pdfUrl={pdfUrl} fields={fields} />
        </main>
      </div>
    </div>
  );
};
