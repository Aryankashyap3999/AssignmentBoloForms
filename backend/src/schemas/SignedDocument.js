import mongoose from 'mongoose';

const signedDocumentSchema = new mongoose.Schema(
  {
    originalDocumentId: mongoose.Schema.Types.ObjectId,
    signedPdfUrl: String,
    originalHash: String,        
    signedHash: String,          
    signerEmail: String,
    signerIpAddress: String,
    signerDeviceInfo: String,
    
    auditLog: [
      {
        action: String,          
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
