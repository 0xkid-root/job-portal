import mongoose from 'mongoose';

const HotlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  screenshot: {
    type: String,
    required: false,
  },
  recruiterEmail: {
    type: String,
    required: [true, 'Recruiter email is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hotlist = mongoose.models.Hotlist || mongoose.model('Hotlist', HotlistSchema);

export default Hotlist;