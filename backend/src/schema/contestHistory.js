import mongoose from "mongoose";

const ContestHistorySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    contest:[
        {
            contestId: {
                type: Number,
                required: true
            },
            contestName: {
                type: String,
                required: true
            },
            rank: {
                type: Number,
                required: true
            },
            newRating: {
                type: Number,
                required: true
            },
            oldRating: {
                type: Number,
                required: true
            },
            unsolvedQuestions: {
                type: Number,
                required: true
            },
            ratingUpdateTimeSeconds:{
                type: Number,
            }
        }
    ]
    
},{timestamps: true});

export default mongoose.model('contestHistorys', ContestHistorySchema);