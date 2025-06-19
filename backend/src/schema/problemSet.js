import mongoose from "mongoose";

const ProblemSetSchema = new mongoose.Schema({
    problems:[]
}, { timestamps: true });

export default mongoose.model('ProblemSets', ProblemSetSchema);

/*
    {
        "contestId": 2121,
        "index": "H",
        "name": "Ice Baby",
        "type": "PROGRAMMING",
        "tags": [
          "binary search",
          "brute force",
          "data structures",
          "dp",
          "implementation",
          "sortings"
        ]
    }
*/