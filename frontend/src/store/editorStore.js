import { create } from 'zustand';

export const useEditorStore = create((set) => ({
  documentId: null,
  fields: [],
  selectedField: null,
  isDragging: false,

  setDocumentId: (id) => set({ documentId: id }),
  setFields: (fields) => set({ fields }),
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),
  deleteField: (id) => set((state) => ({ fields: state.fields.filter((f) => f.id !== id) })),
  setSelectedField: (id) => set({ selectedField: id }),
  setIsDragging: (isDragging) => set({ isDragging }),
}));
