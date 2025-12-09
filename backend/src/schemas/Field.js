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
    
    browserX: Number,
    browserY: Number,
    browserWidth: Number,
    browserHeight: Number,
    
    pdfX: Number,
    pdfY: Number,
    pdfWidth: Number,
    pdfHeight: Number,
    
    pageNumber: {
      type: Number,
      default: 1
    },
    
    content: String,  
    isSigned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Field', fieldSchema);
