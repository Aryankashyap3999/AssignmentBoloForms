import signedDocumentRepository from '../repositories/signedDocumentRepository.js';

export const createSignedDocument = async (signedDocumentData) => {
  const signedDocument = await signedDocumentRepository.create(signedDocumentData);
  return signedDocument;
};

export const getAllSignedDocuments = async () => {
  const signedDocuments = await signedDocumentRepository.getAll();
  return signedDocuments;
};

export const getSignedDocumentById = async (id) => {
  const signedDocument = await signedDocumentRepository.getById(id);
  return signedDocument;
};

export const updateSignedDocument = async (id, updateData) => {
  const signedDocument = await signedDocumentRepository.updateById(id, updateData);
  return signedDocument;
};

export const deleteSignedDocument = async (id) => {
  const signedDocument = await signedDocumentRepository.deleteById(id);
  return signedDocument;
};

export const getSignedDocumentsByOriginalDocumentId = async (originalDocumentId) => {
  const signedDocuments = await signedDocumentRepository.findByOriginalDocumentId(originalDocumentId);
  return signedDocuments;
};

export const getSignedDocumentsBySignerEmail = async (signerEmail) => {
  const signedDocuments = await signedDocumentRepository.findBySignerEmail(signerEmail);
  return signedDocuments;
};

export const getSignedDocumentsByStatus = async (status) => {
  const signedDocuments = await signedDocumentRepository.findByStatus(status);
  return signedDocuments;
};

export const addAuditLogEntry = async (id, auditEntry) => {
  const signedDocument = await signedDocumentRepository.getById(id);
  signedDocument.auditLog.push(auditEntry);
  const updated = await signedDocumentRepository.updateById(id, { auditLog: signedDocument.auditLog });
  return updated;
};
