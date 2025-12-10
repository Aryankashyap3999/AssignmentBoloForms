import { PDFDocument, rgb } from 'pdf-lib';

export const generateSignedPDF = async (originalPdfBuffer, fields, signatureBase64, signerEmail, pdfDisplayWidth = 615) => {
  try {
    const pdfDoc = await PDFDocument.load(originalPdfBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width: pdfWidth, height: pdfHeight } = firstPage.getSize();

    const scale = pdfWidth / (pdfDisplayWidth || 615);

    if (signatureBase64) {
      try {
        const imageBytes = Buffer.from(signatureBase64.split(',')[1] || signatureBase64, 'base64');
        let signatureImage;
        
        try {
          signatureImage = await pdfDoc.embedPng(imageBytes);
        } catch {
          try {
            signatureImage = await pdfDoc.embedJpg(imageBytes);
          } catch {
            signatureImage = null;
          }
        }

        if (signatureImage) {
          const signatureField = fields.find(f => f.type === 'signature');
          if (signatureField) {
            const { x, y, width: w, height: h } = signatureField.coordinates;
            firstPage.drawImage(signatureImage, {
              x: x * scale,
              y: pdfHeight - (y * scale) - (h * scale),
              width: w * scale,
              height: h * scale,
            });
          }
        }
      } catch (imgError) {
        console.warn('Signature image processing error:', imgError.message);
      }
    }

    fields.forEach((field) => {
      const { x, y, width: w, height: h } = field.coordinates;
      const scaledX = x * scale;
      const scaledY = pdfHeight - (y * scale) - (h * scale);
      const scaledW = w * scale;
      const scaledH = h * scale;
      
      if (field.type === 'text') {
        firstPage.drawText('[' + field.id + ']', {
          x: scaledX,
          y: scaledY,
          size: 10,
          color: rgb(0, 0, 0),
        });
      } else if (field.type === 'signature' && !signatureBase64) {
        firstPage.drawRectangle({
          x: scaledX,
          y: scaledY,
          width: scaledW,
          height: scaledH,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
        firstPage.drawText('Signature', {
          x: scaledX + 5,
          y: scaledY + scaledH / 2,
          size: 8,
          color: rgb(0, 0, 0),
        });
      } else if (field.type === 'date') {
        const today = new Date().toLocaleDateString();
        firstPage.drawText(today, {
          x: scaledX,
          y: scaledY,
          size: 10,
          color: rgb(0, 0, 0),
        });
      }
    });

    firstPage.drawText(`Signed by: ${signerEmail}`, {
      x: 50,
      y: 30,
      size: 8,
      color: rgb(0.4, 0.4, 0.4),
    });

    firstPage.drawText(`Timestamp: ${new Date().toISOString()}`, {
      x: 50,
      y: 15,
      size: 8,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Save PDF to bytes
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error(`Failed to generate signed PDF: ${error.message}`);
  }
};

export default { generateSignedPDF };
