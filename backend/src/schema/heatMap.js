import mongoose from "mongoose";

const HeatMapSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
        index: true
    },
    heatmap:[
        {
            date: {
                type: Date,
                required: true
            },
            submissionCount: {
                type: Number,
                required: true,
                default: 0
            },
        }
    ]
}, {
    timestamps: true
});
export default mongoose.model('heatMaps', HeatMapSchema);