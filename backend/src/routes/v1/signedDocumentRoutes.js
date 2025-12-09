import express from 'express';
import * as signedDocumentController from '../../controllers/signedDocumentController.js';

const router = express.Router();

router.post('/sign', signedDocumentController.signDocument);
router.get('/', signedDocumentController.getAllSignedDocuments);
router.get('/document/:documentId', signedDocumentController.getSignedDocumentsByOriginalDocument);
router.get('/signer', signedDocumentController.getSignedDocumentsBySignerEmail);
router.get('/:id', signedDocumentController.getSignedDocumentById);
router.post('/:id/audit', signedDocumentController.addAuditLog);
router.get('/:id/duration', signedDocumentController.getSigningDuration);
router.delete('/:id', signedDocumentController.deleteSignedDocument);

export default router;
