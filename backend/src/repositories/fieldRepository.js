import crudRepository from './crudRepository.js';
import Field from '../schemas/Field.js';

const fieldRepository = crudRepository(Field);

export default {
  ...fieldRepository,
  findByDocumentId: async (documentId) => {
    return await Field.find({ documentId });
  },
  findUnsignedFields: async (documentId) => {
    return await Field.find({ documentId, isSigned: false });
  },
  findSignedFields: async (documentId) => {
    return await Field.find({ documentId, isSigned: true });
  }
};
