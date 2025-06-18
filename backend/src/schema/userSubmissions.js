import mongoose, { version } from "mongoose";

const UserSubmissionsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
        index: true
    },
    submissions:[{
        id: {
            type: Number,
            required: true
        },
        contestId: {
            type: Number,
            required: true
        },
        creationTimeSeconds: {
            type: Number,
            required: true
        },
        relativeTimeSeconds: {
            type: Number,
            required: true
        },
        problem: {
            contestId: {
                type: Number,
                required: true
            },
            index: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            tags: [{
                type: String
            }],
            rating: {
                type: Number,
                default: null
            }
        },
        verdict: {
            type: String,
            required: true
        },
        programmingLanguage: {
            type: String,
            required: true
        }
    }]
},{timestamps: true});
export default mongoose.model('userSubmissions', UserSubmissionsSchema);

/*
    {
      "id": 323498056,
      "contestId": 2117,
      "creationTimeSeconds": 1749398581,
      "relativeTimeSeconds": 5281,
      "problem": {
        "contestId": 2117,
        "index": "D",
        "name": "Retaliation",
        "type": "PROGRAMMING",
        "tags": [
          "binary search",
          "math",
          "number theory"
        ]
      },
      "author": {
        "contestId": 2117,
        "participantId": 212220683,
        "members": [
          {
            "handle": "manish-dev"
          }
        ],
        "participantType": "CONTESTANT",
        "ghost": false,
        "startTimeSeconds": 1749393300
      },
      "programmingLanguage": "C++20 (GCC 13-64)",
      "verdict": "OK",
      "testset": "TESTS",
      "passedTestCount": 12,
      "timeConsumedMillis": 92,
      "memoryConsumedBytes": 102400
    }
*/