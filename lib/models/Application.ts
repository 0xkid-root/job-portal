import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  consultant: mongoose.Types.ObjectId;
  recruiter: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  coverLetter?: string;
  proposedRate?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  consultant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'shortlisted', 'interviewed', 'hired', 'rejected'],
    default: 'pending'
  },
  coverLetter: String,
  proposedRate: Number,
  notes: String
}, {
  timestamps: true
});

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);