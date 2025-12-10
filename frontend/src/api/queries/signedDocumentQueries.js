import apiClient from '../client';

export const signDocument = (signData) => {
  return apiClient.post('/signed-documents/sign', signData);
};

export const getSignedDocuments = () => {
  return apiClient.get('/signed-documents');
};

export const getSignedDocument = (id) => {
  return apiClient.get(`/signed-documents/${id}`);
};

export const getDocumentAudit = (id) => {
  return apiClient.post(`/signed-documents/${id}/audit`);
};
