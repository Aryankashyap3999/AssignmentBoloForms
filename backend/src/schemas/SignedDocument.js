import mongoose from 'mongoose';

const signedDocumentSchema = new mongoose.Schema(
  {
    originalDocumentId: mongoose.Schema.Types.ObjectId,
    signedPdfUrl: String,
    originalHash: String,         // SHA-256 hash before signing
    signedHash: String,           // SHA-256 hash after signing
    signerEmail: String,
    signerIpAddress: String,
    signerDeviceInfo: String,
    
    auditLog: [
      {
        action: String,           // 'field_filled', 'document_signed'
        timestamp: Date,
        details: String
      }
    ],
    
    status: {
      type: String,
      enum: ['successfully_signed', 'partially_signed'],
      default: 'successfully_signed'
    }
  },
  { timestamps: true }
);

export default mongoose.model('SignedDocument', signedDocumentSchema);
