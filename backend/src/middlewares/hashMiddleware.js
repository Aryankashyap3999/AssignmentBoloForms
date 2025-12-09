import { hashBuffer } from '../utils/hashUtils.js';

export const captureRequestHash = (req, res, next) => {
  if (req.method === 'POST' && req.body.pdfBuffer) {
    const hash = hashBuffer(Buffer.from(req.body.pdfBuffer, 'base64'));
    req.pdfHash = hash;
  }
  next();
};
