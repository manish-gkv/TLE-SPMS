import mongoose from "mongoose";

const InactivitySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
        index: true
    },
    reminderSentCount: {
        type: Number
    },
    lastSubmissionTime: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model('inactivitys', InactivitySchema);