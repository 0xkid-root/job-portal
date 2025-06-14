import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'c2c' | 'contract' | 'full-time';
  duration?: string;
  rate: {
    min: number;
    max: number;
    type: 'hourly' | 'daily' | 'monthly' | 'annual';
  };
  skills: string[];
  experience: string;
  requirements?: string[];
  benefits?: string[];
  remote: boolean;
  urgent: boolean;
  isPremium: boolean;
  status: 'active' | 'closed' | 'draft';
  views: number;
  postedBy: mongoose.Types.ObjectId;
  contactEmail?: string;
  contactPhone?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['c2c', 'contract', 'full-time'], required: true },
  duration: String,
  rate: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    type: { type: String, enum: ['hourly', 'daily', 'monthly', 'annual'], default: 'hourly' }
  },
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  requirements: [String],
  benefits: [String],
  remote: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
  views: { type: Number, default: 0 },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contactEmail: String,
  contactPhone: String,
  expiresAt: { type: Date, required: true }
}, {
  timestamps: true
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);