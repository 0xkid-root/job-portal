import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'c2c' | 'contract' | 'full-time';
  duration?: string;
  skills: string[];
  experience: string;
  requirements?: string[];
  benefits?: string[];
  remote: boolean;
  urgent: boolean;
  contactEmail: string;
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
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  requirements: [String],
  benefits: [String],
  remote: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false },
  contactEmail: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);