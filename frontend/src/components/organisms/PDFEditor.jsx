import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useState, useRef, useEffect } from 'react';
import { TextField } from '../molecules/TextField';
import { SignatureField } from '../molecules/SignatureField';
import { DateField } from '../molecules/DateField';
import { RadioField } from '../molecules/RadioField';
import { useEditorStore } from '../../store/editorStore';
import './PDFEditor.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFEditor = ({ pdfUrl, fields, onFieldUpdate }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const selectedField = useEditorStore((state) => state.selectedField);
  const setSelectedField = useEditorStore((state) => state.setSelectedField);
  const updateField = useEditorStore((state) => state.updateField);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFieldDrag = (e, fieldId) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - field.width / 2;
    const newY = e.clientY - rect.top - field.height / 2;

    updateField(fieldId, { x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleResize = (e, fieldId) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const field = fields.find((f) => f.id === fieldId);

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, field.width + (moveEvent.clientX - startX));
      const newHeight = Math.max(50, field.height + (moveEvent.clientY - startY));
      updateField(fieldId, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderField = (field) => {
    const props = {
      field,
      isSelected: selectedField === field.id,
      onSelect: setSelectedField,
      onDragStart: () => {},
      onResize: (e) => handleResize(e, field.id),
    };

    switch (field.type) {
      case 'text':
        return <TextField key={field.id} {...props} />;
      case 'signature':
        return <SignatureField key={field.id} {...props} />;
      case 'date':
        return <DateField key={field.id} {...props} />;
      case 'radio':
        return <RadioField key={field.id} {...props} />;
      default:
        return null;
    }
  };

  if (!pdfUrl) {
    return <div className="pdf-editor-empty">No PDF loaded</div>;
  }

  return (
    <div className="pdf-editor" ref={containerRef}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages || 1 }, (_, i) => (
          <div key={i + 1} className="pdf-page">
            <Page pageNumber={i + 1} scale={scale} />
            <div className="fields-layer">
              {fields.filter((f) => f.pageNumber === i + 1).map(renderField)}
            </div>
          </div>
        ))}
      </Document>
    </div>
  );
};
