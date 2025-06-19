Video Link(https://youtu.be/_Yi2enATsls)

# Student Progress Management System (SPMS)

![GitHub Repo stars](https://img.shields.io/github/stars/manish-gkv/TLE-SPMS?style=social)


## Documentation

This is a simple Student Progress Management System built with React, Node.js, and MongoDB. It allows teachers to manage student data, track progress of codeforce contests, and maintain a record of student performance.

## Problem Statement
### Student Table View
Create a table listing all enrolled students, showing: Name, Email, Phone Number, Codeforces Handle, Current Rating, and Max Rating. Include options to add, edit, delete students and download the entire dataset as CSV. Show an option in the row to view more details, clicking on which student's Codeforces progress should be shown.


### Student Profile View
On clicking a student row, show two sections:

#### Contest History
Allow filtering by the last 30, 90, or 365 days. For the selected filter, show a rating graph and list of contests with rating changes, ranks and number of problems unsolved by the user in that contest till date.

#### Problem Solving Data
 Allow filtering by the last 7, 30, or 90 days. Show the following based on the filter:
- Most difficult problem solved (by rating)
- Total problems solved
- Average rating
- Average problems per day
- Bar chart of number of problems solved per rating bucket
- Show a submission heat map

### Codeforces Data Sync
Automatically fetch and store updated Codeforces data once a day (e.g., at 2 AM) with a cron. Avoid real-time API calls during user interaction hours at other times of the day. Store all the data required to ensure the student’s profile data can be shown. Provide an option to change the time at which the cron runs or the frequency of it.
On the main table, show when the data was last updated for that user.

- Note: If a user’s CF handle is updated in the main table, then the CF data must be fetched again in realtime without having to wait for the cron job to run later.

### Inactivity Detection
After each sync, identify students who haven’t made any submissions in the last 7 days. Send them an automatic email asking them to get back to problem solving. Also, provide an option to see how many times a reminder email has been sent to a user. Provide an option to disable the automatic email for individual students.


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/manish-gkv/TLE-SPMS
    ```
2. Navigate to the project directory:
   ```bash
   cd TLE-SPMS
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
4. Set up environment variables for the backend (e.g., MongoDB connection string).
    Create a `.env` file in the `backend` directory with the following content:
    ```plaintext
    MONGODB_CONNECTION_STRING=your_mongodb_connection_string
    EMAIL = yourmail@gmail.com
    EMAIL_PASSWORD = yourpassword

    ```
    
5. Start the backend server:
   ```bash
   cd backend && node src/server.js
   ```

   Ensure that the backend server is running on the correct port (default is 3000).

6. Start the frontend application:
   ```bash
   cd frontend && npm start
   ```

7. Open your browser and navigate to `http://localhost:5173` to access the application.


## API Endpoints
- `GET /students`: Fetch all students

   response:
   ```json
   {
       "success": true,
       "message": "Students fetched successfully",
       "data": [
           {
                "_id": "12345",
                "name": "John Doe",
                "codeforcesHandle": "johndoe",
                "email": "sample@gmail.com",
                "currentRating": 1500,
                "maxRating": 1600,
                "lastSynced": "2023-10-01T12:00:00Z"
           },
           {
                "_id": "67890",
                "name": "Jane Smith",
                "codeforcesHandle": "janesmith",
                "email": "sample@gmail.com",
                "currentRating": 1400,
                "maxRating": 1550,
                "lastSynced": "2023-10-01T12:00:00Z"
           }
           ...
       ]
   }
   ```
- `POST /students`: Add a new student

    body:
    ```json
    {
         "name": "Student Name",
         "handle": "Student Handle",
         "email": "sample@gmail.com",
         "phone": "1234567890"
    }
    ```
    response:
    ```json
    {
         "success": true,
         "message": "Student added successfully",
         "data": {
             "_id": "student_id",
             "name": "Student Name",
             "handle": "Student Handle",
             "email": "sample@gmail.com",
             "phone": "1234567890",
             "currentRating": 0,
             "maxRating": 0,
             "lastSynced": "2023-10-01T12:00:00Z"
         }
    }
    ```

- `GET /students/:id`: Fetch a specific student by ID

    response:
    ```json
    {
         "success": true,
         "message": "Student fetched successfully",
         "data": {
                "_id": "student_id",
                "name": "Student Name",
                "handle": "Student Handle",
                "email": "sample@gmail.com",
                "phone": "1234567890",
                "currentRating": 0,
                "maxRating": 0,
                "lastSynced": "2023-10-01T12:00:00Z"
         }
    }
    ```
              
- `PUT /students/`: Update a student

    body:
   ```json
   {
       "id": "student_id",
       "name": "Student Name",
       "handle": "Student Handle",
       "email": "example@gmail.com",
       "phone": "1234567890"
   }
   ```
    response:
    ```json
    {
         "success": true,
         "message": "Student updated successfully",
         "data": {
              "_id": "student_id",
              "name": "Student Name",
              "handle": "Student Handle",
              "email": "sample@gmail.com",
                "phone": "1234567890",
                "currentRating": 0,
                "maxRating": 0,
                "lastSynced": "2023-10-01T12:00:00Z"
         }
    }
    ``` 

- `DELETE /students/`: Delete a student 

   body:
   ```json
   {
       "id": "student_id"
   }
   ```
    response:
    ```json
    {
         "success": true,
         "message": "Student deleted successfully"
    }
    ```

- `GET /students/:id/contest-history`: Fetch contest history for a student

    response:
    ```json
    {
         "success": true,
         "message": "Contest history fetched successfully",
         "data": [
             {
                 "contestId": 1234,
                 "contestName": "Codeforces Round #1234",
                 "rank": 10,
                 "newRating": 1500,
                 "oldRating": 1400,
                 "unsolvedQuestions": 2,
                 "ratingUpdateTimeSeconds": 1633024800
             },
             ...
         ]
    }
    ```

- `PUT /students/:id/update-handle`: Update student handle

    body:
    ```json
    {
         "handle": "New Handle"
    }
    ```
    response:
    ```json
    {
         "success": true,
         "message": "Handle updated successfully"
    }
    ```
- `POST /students/:id/sync-data`: Sync student data from codeforce

   body:
   ```json
   {
       "handle": "Student Handle"
   }
   ```
    response:
    ```json
    {
         "success": true,
         "message": "Data synced successfully",
         "data": {
              "_id": "student_id",
              "name": "Student Name",
              "handle": "Student Handle",
              "email": "sample@gmail.com",
              "phone": "1234567890",
              "currentRating": 1500,
              "maxRating": 1600,
              "lastSynced": "2023-10-01T12:00:00Z"
         }
    }
    ```
- `GET /students/:id/submissions`: Fetch submissions for a student

    response:
    ```json
    {
         "success": true,
         "message": "Submissions fetched successfully",
         "data": [
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
                     "tags": ["binary search", "math", "number theory"],
                     "rating": null
                 },
                 "verdict": "OK",
                 "programmingLanguage": "C++20 (GCC 13-64)"
             },
             ...
         ]
    }
    ```
- `POST /sync-time`: set cron time for data sync

   body:
   ```json
   {
       "cronTime": "cron_time"
   }
   ```
   response:
   ```json
   {
       "success": true,
       "message": "Cron time set successfully"
   }
   ```
- `GET /get-cron-time`: Get the current cron time

    response:
    ```json
    {
         "success": true,
         "message": "Cron time fetched successfully",
         "data": {
              "cronTime": "cron_time"
         }
    }
    ```
- `POST /validate-cron-time`: Validate cron time

   body:
   ```json
   {
       "cronTime": "cron_time"
   }
   ```
   response:
    ```json
    {
         "success": true,
         "message": "Cron time is valid"
    }
    ```

## Folder Structure
```
.
├── backend
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── src
│       ├── config
│       │   ├── database.js
│       │   └── server.js
│       ├── controllers
│       │   ├── profile.js
│       │   ├── student.js
│       │   └── sync-time.js
│       ├── repository
│       │   ├── contestHistory.js
│       │   ├── crudRepository.js
│       │   ├── inactivity.js
│       │   ├── problemSet.js
│       │   ├── student.js
│       │   └── userSubmissions.js
│       ├── routes
│       │   └── student.js
│       ├── schema
│       │   ├── contestHistory.js
│       │   ├── inactivity.js
│       │   ├── problemSet.js
│       │   ├── student.js
│       │   └── userSubmissions.js
│       ├── server.js
│       ├── services
│       │   ├── codeforces
│       │   │   ├── codeforces.js
│       │   │   ├── getProblemSet.js
│       │   │   ├── getProfileDetails.js
│       │   │   ├── getRatedContestHistoryDetails.js
│       │   │   ├── getUpdatedContestHistoryWithUnsolvedCount.js
│       │   │   └── getUserSubmissions.js
│       │   ├── cron.js
│       │   ├── dataSync.js
│       │   ├── email.js
│       │   ├── inactivity.js
│       │   ├── job.js
│       │   ├── profile.js
│       │   └── student.js
│       └── utility
│           ├── common
│           │   └── responseObject.js
│           ├── constant.js
│           └── errors
│               └── clientError.js
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── day-mode.png
│   │   ├── moon.png
│   │   ├── tle.png
│   │   ├── user.png
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Error.jsx
│   │   │   ├── MainTable.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── popup-buttons
│   │   │   │   ├── addStudent.jsx
│   │   │   │   ├── changeCronTime.jsx
│   │   │   │   ├── deleteStudent.jsx
│   │   │   │   └── editStudent.jsx
│   │   │   ├── profile
│   │   │   │   ├── ContestHistory.jsx
│   │   │   │   ├── HeatMap.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── RatingChange.jsx
│   │   │   │   ├── RatingWiseQuestions.jsx
│   │   │   │   └── StudentInfo.jsx
│   │   │   ├── table
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Row.jsx
│   │   │   │   └── Table.jsx
│   │   │   └── utility
│   │   │       └── Filter.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── utility
│   │       ├── constants.js
│   │       ├── getAverageRating.js
│   │       ├── getMostDifficultRating.js
│   │       ├── getProblemSolvedPerDayCount.js
│   │       ├── getRatingWiseQuestions.js
│   │       ├── getTotalSolved.js
│   │       ├── getUserHeatMapValues.js
│   │       └── getUserRatingHistory.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── structure.md

23 directories, 81 files

```


## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, React Router, Toastify
- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Database**: MongoDB 
