import documentRepository from '../repositories/documentRepository.js';
import { hashBuffer } from '../utils/hashUtils.js';

export const createDocument = async (documentData, pdfBuffer) => {
  const pdfHash = hashBuffer(pdfBuffer);
  
  const document = await documentRepository.create({
    ...documentData,
    originalHash: pdfHash,
    pdfBuffer: pdfBuffer
  });
  
  return document;
};

export const getAllDocuments = async () => {
  const documents = await documentRepository.getAll();
  return documents;
};

export const getDocumentById = async (id) => {
  const document = await documentRepository.getById(id);
  return document;
};

export const updateDocument = async (id, updateData) => {
  const document = await documentRepository.updateById(id, updateData);
  return document;
};

export const deleteDocument = async (id) => {
  const document = await documentRepository.deleteById(id);
  return document;
};

export const getDocumentsByStatus = async (status) => {
  const documents = await documentRepository.findByStatus(status);
  return documents;
};

export const getDocumentsByCreator = async (createdBy) => {
  const documents = await documentRepository.findByCreatedBy(createdBy);
  return documents;
};

export const getDocumentsByRecipient = async (recipientEmail) => {
  const documents = await documentRepository.findByRecipientEmail(recipientEmail);
  return documents;
};

export const updateDocumentStatus = async (id, status) => {
  const document = await documentRepository.updateById(id, { status });
  return document;
};

export const getDocumentWithHash = async (id) => {
  const document = await documentRepository.getById(id);
  return {
    id: document._id,
    fileName: document.fileName,
    pdfUrl: document.pdfUrl,
    originalHash: document.originalHash,
    pdfWidth: document.pdfWidth,
    pdfHeight: document.pdfHeight,
    status: document.status
  };
};
