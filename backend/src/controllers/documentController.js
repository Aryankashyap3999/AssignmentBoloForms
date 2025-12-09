import * as documentService from '../services/documentService.js';
import { isValidEmail } from '../utils/validationUtils.js';

export const uploadDocument = async (req, res) => {
  try {
    const { fileName, pdfUrl, pdfWidth, pdfHeight, createdBy, recipientEmail } = req.body;

    if (!fileName || !pdfUrl || !pdfWidth || !pdfHeight || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (recipientEmail && !isValidEmail(recipientEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const pdfBuffer = Buffer.from(''); // Placeholder - implement actual PDF buffer reading

    const document = await documentService.createDocument(
      { fileName, pdfUrl, pdfWidth, pdfHeight, createdBy, recipientEmail, status: 'draft' },
      pdfBuffer
    );

    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentService.getAllDocuments();
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['draft', 'signed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const document = await documentService.updateDocumentStatus(id, status);
    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocumentsByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ error: 'Status parameter is required' });
    }

    const documents = await documentService.getDocumentsByStatus(status);
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await documentService.deleteDocument(id);

    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
