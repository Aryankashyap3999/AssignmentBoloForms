import { PDFDocument, rgb } from 'pdf-lib';

export const generateSignedPDF = async (originalPdfBuffer, fields, signatureBase64, signerEmail) => {
  try {
    // Load the original PDF
    const pdfDoc = await PDFDocument.load(originalPdfBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    console.log('PDF page size:', { width, height });
    console.log('Fields to add:', JSON.stringify(fields, null, 2));

    // Add signature image if provided
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
            console.warn('Could not embed signature image');
            signatureImage = null;
          }
        }

        if (signatureImage) {
          // Find signature field and place image
          const signatureField = fields.find(f => f.type === 'signature');
          if (signatureField) {
            const { x, y, width: w, height: h } = signatureField.coordinates;
            console.log('Signature field coordinates:', { x, y, w, h });
            console.log('Placing signature at:', { 
              x: x, 
              y: height - y - h, 
              width: w, 
              height: h 
            });
            
            firstPage.drawImage(signatureImage, {
              x: x,
              y: height - y - h, // PDF coordinates are from bottom
              width: w,
              height: h,
            });
          } else {
            console.warn('No signature field found in fields array');
          }
        }
      } catch (imgError) {
        console.warn('Signature image processing error:', imgError.message);
      }
    }

    // Add text annotations for other fields
    fields.forEach((field) => {
      if (field.type === 'text') {
        const { x, y, width: w, height: h } = field.coordinates;
        firstPage.drawText('[' + field.id + ']', {
          x: x,
          y: height - y - h,
          size: 10,
          color: rgb(0, 0, 0),
        });
      } else if (field.type === 'signature' && !signatureBase64) {
        // Draw placeholder if no signature image
        const { x, y, width: w, height: h } = field.coordinates;
        firstPage.drawRectangle({
          x: x,
          y: height - y - h,
          width: w,
          height: h,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
        firstPage.drawText('Signature', {
          x: x + 5,
          y: height - y - h + h / 2,
          size: 8,
          color: rgb(0, 0, 0),
        });
      } else if (field.type === 'date') {
        const { x, y, width: w, height: h } = field.coordinates;
        const today = new Date().toLocaleDateString();
        firstPage.drawText(today, {
          x: x,
          y: height - y - h,
          size: 10,
          color: rgb(0, 0, 0),
        });
      }
    });

    // Add signer info at bottom
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
