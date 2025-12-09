import documentRepository from '../repositories/documentRepository.js';

export const createDocument = async (documentData) => {
  const document = await documentRepository.create(documentData);
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
