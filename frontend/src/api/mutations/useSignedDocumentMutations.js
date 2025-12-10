import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signDocument, getSignedDocuments, getSignedDocument, getDocumentAudit } from '../queries/signedDocumentQueries';

export const useSignDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (signData) => {
      const response = await signDocument(signData);
      return response.data; // Return { success: true, data: signedDocument }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signedDocuments'] });
    },
  });
};

export const useGetSignedDocuments = () => {
  return useQuery({
    queryKey: ['signedDocuments'],
    queryFn: getSignedDocuments,
  });
};

export const useGetSignedDocument = (id) => {
  return useQuery({
    queryKey: ['signedDocument', id],
    queryFn: () => getSignedDocument(id),
    enabled: !!id,
  });
};

export const useGetDocumentAudit = (id) => {
  return useQuery({
    queryKey: ['audit', id],
    queryFn: () => getDocumentAudit(id),
    enabled: !!id,
  });
};
