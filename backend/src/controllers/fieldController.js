import * as fieldService from '../services/fieldService.js';

export const addField = async (req, res) => {
  try {
    const { documentId, fieldType, fieldLabel, browserX, browserY, browserWidth, browserHeight, viewport, pdfDims } = req.body;

    if (!documentId || !fieldType || !browserX || !browserY || !browserWidth || !browserHeight) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!viewport || !pdfDims) {
      return res.status(400).json({ error: 'Viewport and PDF dimensions are required' });
    }

    const fieldData = {
      documentId,
      fieldType,
      fieldLabel: fieldLabel || fieldType,
      browserX,
      browserY,
      browserWidth,
      browserHeight
    };

    const field = await fieldService.createFieldWithCoordinateConversion(fieldData, viewport, pdfDims);
    res.status(201).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFieldsByDocumentId = async (req, res) => {
  try {
    const { documentId } = req.params;
    const fields = await fieldService.getFieldsByDocumentId(documentId);

    res.status(200).json({ success: true, data: fields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await fieldService.getFieldById(id);

    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    res.status(200).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const field = await fieldService.updateField(id, updateData);
    res.status(200).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signField = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required for signing' });
    }

    const field = await fieldService.updateFieldContent(id, content);
    res.status(200).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnsignedFields = async (req, res) => {
  try {
    const { documentId } = req.params;
    const fields = await fieldService.getUnsignedFieldsByDocumentId(documentId);

    res.status(200).json({ success: true, data: fields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await fieldService.deleteField(id);

    res.status(200).json({ success: true, data: field });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
