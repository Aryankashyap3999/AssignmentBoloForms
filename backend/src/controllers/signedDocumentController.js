import * as signedDocumentService from '../services/signedDocumentService.js';
import { isValidEmail } from '../utils/validationUtils.js';
import mongoose from 'mongoose';
import { generateSignedPDF } from '../utils/pdfUtils.js';
import { uploadToS3 } from '../utils/s3Utils.js';
import Document from '../schemas/Document.js';

export const signDocument = async (req, res) => {
  try {
    const { originalDocumentId, signedPdfUrl, signerEmail, signerIpAddress, signerDeviceInfo, fields, signatureBase64 } = req.body;

    console.log('Sign request received:', { originalDocumentId, signerEmail, fieldsCount: fields?.length, hasSignature: !!signatureBase64 });

    if (!originalDocumentId || !signerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidEmail(signerEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Convert string ID to ObjectId
    const docId = mongoose.Types.ObjectId.isValid(originalDocumentId) 
      ? new mongoose.Types.ObjectId(originalDocumentId)
      : originalDocumentId;

    // Fetch original document to get PDF buffer
    let pdfBuffer = Buffer.from('');
    try {
      const originalDoc = await Document.findById(docId);
      console.log('Original document found:', !!originalDoc, 'has buffer:', !!originalDoc?.pdfBuffer);
      if (originalDoc && originalDoc.pdfBuffer) {
        pdfBuffer = originalDoc.pdfBuffer;
      }
    } catch (docError) {
      console.warn('Could not fetch original document:', docError.message);
    }

    // Generate signed PDF with fields and signature
    let signedPdfBuffer;
    let uploadedPdfUrl = signedPdfUrl;
    
    try {
      console.log('Generating PDF with buffer size:', pdfBuffer.length);
      signedPdfBuffer = await generateSignedPDF(pdfBuffer, fields || [], signatureBase64, signerEmail);
      console.log('PDF generated, size:', signedPdfBuffer.length);
      
      // Upload to S3
      uploadedPdfUrl = await uploadToS3(signedPdfBuffer, `signed-${Date.now()}.pdf`);
      console.log('PDF uploaded to S3:', uploadedPdfUrl);
    } catch (pdfError) {
      console.error('PDF generation/upload error:', pdfError.message);
      console.error('Stack:', pdfError.stack);
      // Continue with signing even if PDF generation fails
    }

    const signedDocument = await signedDocumentService.createSignedDocument(
      {
        originalDocumentId: docId,
        signedPdfUrl: uploadedPdfUrl,
        signerEmail,
        signerIpAddress: signerIpAddress || '',
        signerDeviceInfo: signerDeviceInfo || '',
        signatureImage: signatureBase64 || '',
        fields: fields || [],
        status: 'successfully_signed'
      },
      signedPdfBuffer || Buffer.from('')
    );

    console.log('Document signed successfully:', signedDocument._id);
    res.status(201).json({ success: true, data: signedDocument });
  } catch (error) {
    console.error('Signing error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllSignedDocuments = async (req, res) => {
  try {
    const signedDocuments = await signedDocumentService.getAllSignedDocuments();
    res.status(200).json({ success: true, data: signedDocuments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSignedDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const signedDocument = await signedDocumentService.getSignedDocumentById(id);

    if (!signedDocument) {
      return res.status(404).json({ error: 'Signed document not found' });
    }

    res.status(200).json({ success: true, data: signedDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSignedDocumentsByOriginalDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const signedDocuments = await signedDocumentService.getSignedDocumentsByOriginalDocumentId(documentId);

    res.status(200).json({ success: true, data: signedDocuments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSignedDocumentsBySignerEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const signedDocuments = await signedDocumentService.getSignedDocumentsBySignerEmail(email);
    res.status(200).json({ success: true, data: signedDocuments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAuditLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, details } = req.body;

    if (!action) {
      return res.status(400).json({ error: 'Action is required' });
    }

    const updated = await signedDocumentService.addAuditLogEntry(id, { action, details });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSigningDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const duration = await signedDocumentService.getSigningDuration(id);

    res.status(200).json({ success: true, duration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSignedDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const signedDocument = await signedDocumentService.deleteSignedDocument(id);

    res.status(200).json({ success: true, data: signedDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
