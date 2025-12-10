import apiClient from '../client';

export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getDocuments = () => {
  return apiClient.get('/documents');
};

export const getDocument = (id) => {
  return apiClient.get(`/documents/${id}`);
};
