import fieldRepository from '../repositories/fieldRepository.js';
import { browserToPdfCoordinates, validateCoordinatesWithinBounds } from '../utils/coordinateUtils.js';

export const createField = async (fieldData) => {
  const field = await fieldRepository.create(fieldData);
  return field;
};

export const createFieldWithCoordinateConversion = async (fieldData, viewport, pdfDims) => {
  const pdfCoords = browserToPdfCoordinates(
    { x: fieldData.browserX, y: fieldData.browserY, width: fieldData.browserWidth, height: fieldData.browserHeight },
    viewport,
    pdfDims
  );
  
  const isValid = validateCoordinatesWithinBounds(pdfCoords, pdfDims);
  if (!isValid) {
    throw new Error('Field coordinates are outside PDF boundaries');
  }
  
  const fieldWithPdfCoords = {
    ...fieldData,
    pdfX: pdfCoords.x,
    pdfY: pdfCoords.y,
    pdfWidth: pdfCoords.width,
    pdfHeight: pdfCoords.height
  };
  
  const field = await fieldRepository.create(fieldWithPdfCoords);
  return field;
};

export const getAllFields = async () => {
  const fields = await fieldRepository.getAll();
  return fields;
};

export const getFieldById = async (id) => {
  const field = await fieldRepository.getById(id);
  return field;
};

export const updateField = async (id, updateData) => {
  const field = await fieldRepository.updateById(id, updateData);
  return field;
};

export const deleteField = async (id) => {
  const field = await fieldRepository.deleteById(id);
  return field;
};

export const getFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findByDocumentId(documentId);
  return fields;
};

export const getUnsignedFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findUnsignedFields(documentId);
  return fields;
};

export const getSignedFieldsByDocumentId = async (documentId) => {
  const fields = await fieldRepository.findSignedFields(documentId);
  return fields;
};

export const updateFieldContent = async (id, content) => {
  const field = await fieldRepository.updateById(id, { content, isSigned: true });
  return field;
};

export const markFieldAsSigned = async (id) => {
  const field = await fieldRepository.updateById(id, { isSigned: true });
  return field;
};

export const getFieldCoordinatesForPdf = async (fieldId) => {
  const field = await fieldRepository.getById(fieldId);
  return {
    x: field.pdfX,
    y: field.pdfY,
    width: field.pdfWidth,
    height: field.pdfHeight,
    pageNumber: field.pageNumber
  };
};
