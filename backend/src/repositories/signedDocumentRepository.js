import crudRepository from './crudRepository.js';
import SignedDocument from '../schemas/SignedDocument.js';

const signedDocumentRepository = crudRepository(SignedDocument);

export default {
  ...signedDocumentRepository,
  findByOriginalDocumentId: async (originalDocumentId) => {
    return await SignedDocument.find({ originalDocumentId });
  },
  findBySignerEmail: async (signerEmail) => {
    return await SignedDocument.find({ signerEmail });
  },
  findByStatus: async (status) => {
    return await SignedDocument.find({ status });
  }
};
