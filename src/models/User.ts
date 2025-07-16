import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  savedExams: mongoose.Types.ObjectId[];
  preferences: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  savedExams: [{
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }],
  preferences: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
});

// Ensure email uniqueness
UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
