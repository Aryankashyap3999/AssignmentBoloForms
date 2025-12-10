import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { uploadDocument, getDocuments, getDocument } from '../queries/documentQueries';

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      const response = await uploadDocument(file);
      return response.data; // Return { success: true, data: document }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });
};

export const useGetDocument = (id) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocument(id),
    enabled: !!id,
  });
};
