import crudRepository from './crudRepository.js';
import Document from '../schemas/Document.js';

const documentRepository = crudRepository(Document);

export default {
  ...documentRepository,
  findByStatus: async (status) => {
    return await Document.find({ status });
  },
  findByCreatedBy: async (createdBy) => {
    return await Document.find({ createdBy });
  },
  findByRecipientEmail: async (recipientEmail) => {
    return await Document.find({ recipientEmail });
  }
};
