import apiClient from '../client';

export const createField = (fieldData) => {
  return apiClient.post('/fields', fieldData);
};

export const updateField = (id, fieldData) => {
  return apiClient.patch(`/fields/${id}`, fieldData);
};

export const signField = (id, signatureData) => {
  return apiClient.patch(`/fields/${id}/sign`, signatureData);
};

export const deleteField = (id) => {
  return apiClient.delete(`/fields/${id}`);
};
