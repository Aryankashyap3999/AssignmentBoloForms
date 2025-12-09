import * as signedDocumentService from '../services/signedDocumentService.js';
import { isValidEmail } from '../utils/validationUtils.js';

export const signDocument = async (req, res) => {
  try {
    const { originalDocumentId, signedPdfUrl, signerEmail, signerIpAddress, signerDeviceInfo } = req.body;

    if (!originalDocumentId || !signedPdfUrl || !signerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidEmail(signerEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const pdfBuffer = Buffer.from(''); // Placeholder - implement actual PDF buffer reading

    const signedDocument = await signedDocumentService.createSignedDocument(
      {
        originalDocumentId,
        signedPdfUrl,
        signerEmail,
        signerIpAddress: signerIpAddress || '',
        signerDeviceInfo: signerDeviceInfo || '',
        status: 'successfully_signed'
      },
      pdfBuffer
    );

    res.status(201).json({ success: true, data: signedDocument });
  } catch (error) {
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
