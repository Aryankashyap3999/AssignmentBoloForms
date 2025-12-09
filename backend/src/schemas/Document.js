import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    fileName: String,
    pdfUrl: String,
    originalHash: String,        // SHA-256 hash of original PDF
    pdfWidth: Number,             // in points (72 DPI)
    pdfHeight: Number,            // in points (72 DPI)
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
