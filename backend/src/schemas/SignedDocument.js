import mongoose from 'mongoose';

const coordinatesSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number
}, { _id: false });

const fieldSchema = new mongoose.Schema({
  id: String,
  type: String,
  coordinates: coordinatesSchema
}, { _id: false });

const auditLogSchema = new mongoose.Schema({
  action: String,
  timestamp: Date,
  details: String
}, { _id: false });

const signedDocumentSchema = new mongoose.Schema(
  {
    originalDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    },
    signedPdfUrl: String,
    originalHash: String,        
    signedHash: String,          
    signerEmail: String,
    signerIpAddress: String,
    signerDeviceInfo: String,
    signatureImage: String,
    fields: [fieldSchema],
    auditLog: [auditLogSchema],
    
    status: {
      type: String,
      enum: ['successfully_signed', 'partially_signed'],
      default: 'successfully_signed'
    }
  },
  { timestamps: true }
);

export default mongoose.model('SignedDocument', signedDocumentSchema);
