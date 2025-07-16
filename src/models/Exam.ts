import mongoose, { Document, Schema } from 'mongoose';

export interface IExam extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  examDate: Date;
  applicationStartDate: Date;
  applicationEndDate: Date;
  eligibility: string;
  pattern: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>({
  name: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  examDate: {
    type: Date,
    required: [true, 'Exam date is required'],
  },
  applicationStartDate: {
    type: Date,
    required: [true, 'Application start date is required'],
  },
  applicationEndDate: {
    type: Date,
    required: [true, 'Application end date is required'],
  },
  eligibility: {
    type: String,
    required: false,
    default: '',
  },
  pattern: {
    type: String,
    required: false,
    default: '',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
