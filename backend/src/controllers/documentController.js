import * as documentService from '../services/documentService.js';
import { isValidEmail } from '../utils/validationUtils.js';

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, buffer } = req.file;
    const createdBy = req.body.email || 'anonymous';

    const document = await documentService.createDocument(
      { fileName: originalname, createdBy, status: 'draft' },
      buffer
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
