import express from 'express';
import multer from 'multer';
import * as documentController from '../../controllers/documentController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), documentController.uploadDocument);
router.get('/', documentController.getAllDocuments);
router.get('/status/:status', documentController.getDocumentsByStatus);
router.patch('/:id/status', documentController.updateDocumentStatus);
router.get('/:id', documentController.getDocumentById);
router.delete('/:id', documentController.deleteDocument);

export default router;
