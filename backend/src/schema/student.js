import mongoose from 'mongoose';

const Student = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name required']
  },
  email: {
    type: String,
    required: [true, 'Student email required'],
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Student phone number required'],
    unique: true
  },
  codeforcesHandle: {
    type: String,
    default: 'NA',
    unique: true
  },
  currentRating: {
    type: Number,
    default: 0
  },
  maxRating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('students', Student);