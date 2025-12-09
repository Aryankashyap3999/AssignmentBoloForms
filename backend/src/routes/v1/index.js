import express from 'express';
import documentRoutes from './documentRoutes.js';
import fieldRoutes from './fieldRoutes.js';
import signedDocumentRoutes from './signedDocumentRoutes.js';

const router = express.Router();

router.use('/documents', documentRoutes);
router.use('/fields', fieldRoutes);
router.use('/signed-documents', signedDocumentRoutes);

export default router;
