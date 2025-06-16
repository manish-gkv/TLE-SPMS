import { Schema } from "mongoose";

const ProblemSolvingDataSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'students',
        required: true,
        index: true
    },
    mostDifficultProblemSolved: {
        rating: {
            type: Number,
            required: true
        },
        contestId: {
            type: Number,
            required: true
        },
        problemIndex: {
            type: String,
            required: true
        },
        problemName: {
            type: String,
            required: true
        },
    },
    totalProblemsSolved: {
        type: Number,
        required: true
    },
    totalSubmissions: {
        type: Number,
        required: true
    },
    totalProblemsAttempted: {
        type: Number,
        required: true
    },
    totalProblemsUnsolved: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        required: true
    },
    averageProblemPerDay: {
        type: Number,
        required: true
    },
    heatmap:[
        {
            date: {
                type: Date,
                required: true
            },
            submissionCount: {
                type: Number,
                required: true
            },
        }
    ],
    
}, {
    timestamps: true
});
export default mongoose.model('problemSolvingData', ProblemSolvingDataSchema);

/*
{
      "id": 321332376,
      "contestId": 765,
      "creationTimeSeconds": 1748242922,
      "relativeTimeSeconds": 2147483647,
      "problem": {
        "contestId": 765,
        "index": "C",
        "name": "Table Tennis Game 2",
        "type": "PROGRAMMING",
        "points": 1250,
        "rating": 1200,
        "tags": [
          "math"
        ]
      },
      "author": {
        "contestId": 765,
        "participantId": 211178077,
        "members": [
          {
            "handle": "manish-dev"
          }
        ],
        "participantType": "PRACTICE",
        "ghost": false,
        "startTimeSeconds": 1487059500
      },
      "programmingLanguage": "C++20 (GCC 13-64)",
      "verdict": "OK",
      "testset": "TESTS",
      "passedTestCount": 279,
      "timeConsumedMillis": 77,
      "memoryConsumedBytes": 102400
    },
*/