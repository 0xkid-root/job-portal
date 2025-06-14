import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'consultant' | 'recruiter' | 'admin';
  company?: string;
  location?: string;
  phone?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  availability?: 'available' | 'open-to-offers' | 'not-available';
  bio?: string;
  profilePicture?: string;
  resume?: string;
  linkedIn?: string;
  website?: string;
  visa?: string;
  remote?: boolean;
  relocation?: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['consultant', 'recruiter', 'admin'], required: true },
  company: String,
  location: String,
  phone: String,
  skills: [String],
  experience: Number,
  hourlyRate: Number,
  availability: { 
    type: String, 
    enum: ['available', 'open-to-offers', 'not-available'],
    default: 'available'
  },
  bio: String,
  profilePicture: String,
  resume: String,
  linkedIn: String,
  website: String,
  visa: String,
  remote: { type: Boolean, default: false },
  relocation: { type: Boolean, default: false },
  verified: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);