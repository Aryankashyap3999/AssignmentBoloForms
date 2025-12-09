import express from 'express';
import * as fieldController from '../../controllers/fieldController.js';

const router = express.Router();

router.post('/', fieldController.addField);
router.get('/document/:documentId', fieldController.getFieldsByDocumentId);
router.get('/unsigned/:documentId', fieldController.getUnsignedFields);
router.patch('/:id/sign', fieldController.signField);
router.get('/:id', fieldController.getFieldById);
router.patch('/:id', fieldController.updateField);
router.delete('/:id', fieldController.deleteField);

export default router;
