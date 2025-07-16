import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  summary: string;
  category: string;
  sourceURL: string;
  publishedAt: Date;
  dateFetched: Date;
  imageUrl?: string;
  author?: string;
}

const NewsSchema = new Schema<INews>({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, 'News summary is required'],
  },
  category: {
    type: String,
    required: [true, 'News category is required'],
  },
  sourceURL: {
    type: String,
    required: [true, 'Source URL is required'],
  },
  publishedAt: {
    type: Date,
    required: [true, 'Published date is required'],
  },
  dateFetched: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
