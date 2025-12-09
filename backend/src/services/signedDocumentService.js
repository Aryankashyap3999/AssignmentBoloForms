import signedDocumentRepository from '../repositories/signedDocumentRepository.js';
import { hashBuffer } from '../utils/hashUtils.js';
import { getCurrentDate, getTimeDifference } from '../utils/commonUtils.js';

export const createSignedDocument = async (signedDocumentData, signedPdfBuffer) => {
  const signedHash = hashBuffer(signedPdfBuffer);
  
  const signedDocument = await signedDocumentRepository.create({
    ...signedDocumentData,
    signedHash,
    auditLog: [
      {
        action: 'document_signed',
        timestamp: getCurrentDate(),
        details: `Document signed by ${signedDocumentData.signerEmail}`
      }
    ]
  });
  
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
  signedDocument.auditLog.push({
    ...auditEntry,
    timestamp: getCurrentDate()
  });
  const updated = await signedDocumentRepository.updateById(id, { auditLog: signedDocument.auditLog });
  return updated;
};

export const getSigningDuration = async (id) => {
  const signedDocument = await signedDocumentRepository.getById(id);
  if (signedDocument.auditLog && signedDocument.auditLog.length > 0) {
    const startLog = signedDocument.auditLog[0];
    const endLog = signedDocument.auditLog[signedDocument.auditLog.length - 1];
    return getTimeDifference(startLog.timestamp, endLog.timestamp);
  }
  return 0;
};
