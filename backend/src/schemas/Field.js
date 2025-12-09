import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema(
  {
    documentId: mongoose.Schema.Types.ObjectId,
    fieldType: {
      type: String,
      enum: ['signature', 'text', 'image', 'date', 'radio'],
      required: true
    },
    fieldLabel: String,
    
    // Browser coordinates (CSS pixels, top-left origin)
    browserX: Number,
    browserY: Number,
    browserWidth: Number,
    browserHeight: Number,
    
    // PDF coordinates (Points, bottom-left origin)
    pdfX: Number,
    pdfY: Number,
    pdfWidth: Number,
    pdfHeight: Number,
    
    pageNumber: {
      type: Number,
      default: 1
    },
    
    // Content after signing
    content: String,  // Can store base64 for signature, text value, etc.
    isSigned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Field', fieldSchema);
