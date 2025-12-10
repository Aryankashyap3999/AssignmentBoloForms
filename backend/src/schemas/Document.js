import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    fileName: String,
    pdfUrl: String,
    pdfBuffer: Buffer,
    originalHash: String,      
    pdfWidth: Number,            
    pdfHeight: Number,           
    status: {
      type: String,
      enum: ['draft', 'signed'],
      default: 'draft'
    },
    createdBy: String,
    recipientEmail: String
  },
  { timestamps: true }
);

export default mongoose.model('Document', documentSchema);
