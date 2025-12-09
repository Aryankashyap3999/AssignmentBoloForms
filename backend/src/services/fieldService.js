import fieldRepository from '../repositories/fieldRepository.js';

export const createField = async (fieldData) => {
  const field = await fieldRepository.create(fieldData);
  return field;
};

export const getAllFields = async () => {
  const fields = await fieldRepository.getAll();
  return fields;
};

export const getFieldById = async (id) => {
  const field = await fieldRepository.getById(id);
  return field;
};

export const updateField = async (id, updateData) => {
  const field = await fieldRepository.updateById(id, updateData);
  return field;
};

export const deleteField = async (id) => {
  const field = await fieldRepository.deleteById(id);
  return field;
};

export const getFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findByDocumentId(documentId);
  return fields;
};

export const getUnsignedFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findUnsignedFields(documentId);
  return fields;
};

export const getSignedFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findSignedFields(documentId);
  return fields;
};

export const updateFieldContent = async (id, content) => {
  const field = await fieldRepository.updateById(id, { content, isSigned: true });
  return field;
};

export const markFieldAsSigned = async (id) => {
  const field = await fieldRepository.updateById(id, { isSigned: true });
  return field;
};
