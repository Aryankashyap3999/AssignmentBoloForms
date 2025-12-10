import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createField, updateField, signField, deleteField } from '../queries/fieldQueries';

export const useCreateField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
    },
  });
};

export const useUpdateField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateField(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
    },
  });
};

export const useSignField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => signField(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
    },
  });
};

export const useDeleteField = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
    },
  });
};
